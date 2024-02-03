import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.css',
    imports: [
        NgIf,
        NgFor,
        KeyValuePipe,
        DatePipe,
        CurrencyPipe,
        DecimalPipe,
        FormsModule
    ]
})
export class DataTableComponent implements OnInit {
    errorMsg: string = '';
    months: string[] = [];
    financialYear: 'finYear22-23' | 'finYear23-24' = 'finYear23-24';

    sum: { [key: string]: number } = {};
    monthlyCounts: {
        [key: string]: { monthOfYear: string, existingCount: number }[]
    } = {};
    roleCompensations: { [key: string]: number } = {};
    
    constructor(
        private dataService: DataService,
    ) {}

    ngOnInit(): void {
        this.getRoles();
        this.getMonthlyCounts('2023-04-01', '2024-03-31');
    }

    getMonthlyCounts(fromMonth: string, toMonth: string): void {
        this.dataService.getMonthlyCounts(fromMonth, toMonth)
        .subscribe({
            next: (result) => {
                this.monthlyCounts = {};

                result.data?.forEach((monthlyCount) => {
                    const key: string = String(monthlyCount.role?.roleName);
                    const data: {
                        monthOfYear: string,
                        existingCount: number
                    } = {
                        monthOfYear: monthlyCount.monthOfYear,
                        existingCount: monthlyCount.existingCount
                    }
                    
                    if (Object.hasOwn(this.monthlyCounts, key)) {
                        this.monthlyCounts[key].push(data);

                    } else {
                        this.monthlyCounts[key] = [data];
                    }
                });

                this.months = [...this.monthlyCounts[Object.keys(this.monthlyCounts)[0]].map((e) => e.monthOfYear)];

                Object.keys(this.monthlyCounts).forEach((roleName) => {
                    this.monthlyCounts[roleName].forEach((role, idx) => {
                        this.onCountUpdate(0, roleName, idx);
                    });
                });
            },
            error: (error) => {
                this.errorMsg = 'Error in fetching monthly counts.';
            }
        });
    }

    getRoles(): void {
        this.dataService.getRoles()
        .subscribe({
            next: (result) => {
                result.data?.forEach((role) => {
                    this.roleCompensations[role?.roleName] = role.avgCompensation;
                });
            },
            error: (error) => {
                this.errorMsg = 'Error in fetching roles.';
            }
        });
    }

    onUpdateFinancialYear(value: string): void {
        if (value === 'finYear22-23') {
            this.getMonthlyCounts('2022-04-01', '2023-03-31');

        } else {
            this.getMonthlyCounts('2023-04-01', '2024-03-31');
        }
    }

    onCountUpdate(data: number, roleName: string, monthOfYearIdx: number): void {
        // Total head count by role
        this.sum[`${roleName}-annual-headcount`] = this.monthlyCounts[roleName].reduce((acc, obj) => acc + obj.existingCount, 0);
            
        // Total compensation for all head counts by role
        this.sum[`${roleName}-annual-ctc`] = this.sum[`${roleName}-annual-headcount`] * this.roleCompensations[roleName];

        // Total head count by month
        this.sum[`${this.months[monthOfYearIdx]}-annual-headcount`] = 0;

        // Total compensation for all roles by each month
        this.sum[`${this.months[monthOfYearIdx]}-annual-ctc`] = 0;

        // Final Annual total of headcount
        this.sum['final-annual-headcount'] = 0;

        // Final Annual total of compensation
        this.sum['final-annual-ctc'] = 0;
        
        Object.keys(this.monthlyCounts).forEach((roleName) => {
            // Total head count by month
            this.sum[`${this.months[monthOfYearIdx]}-annual-headcount`] += this.monthlyCounts[roleName][monthOfYearIdx].existingCount;

            // Total compensation for all roles by each month
            this.sum[`${this.months[monthOfYearIdx]}-annual-ctc`] += (this.monthlyCounts[roleName][monthOfYearIdx].existingCount * this.roleCompensations[roleName]);
        });

        Object.keys(this.roleCompensations).forEach((role) => {
            this.sum['final-annual-headcount'] += this.sum[`${role}-annual-headcount`];
        });

        this.months.forEach((month) => {
            this.sum['final-annual-ctc'] += this.sum[`${month}-annual-ctc`];
        });
    }
}
