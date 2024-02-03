import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MonthlyCount } from "../models/monthly-count.model";
import { Role } from "../models/role.model";

interface APIResponse<T> {
    data: null | T;
    error: null | {
        code: string;
        message: string;
        stack?: string;
    };
}

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        private http: HttpClient
    ) {}

    getMonthlyCounts(fromMonth: string, toMonth: string): Observable<APIResponse<MonthlyCount[]>> {
        return this.http.get<APIResponse<MonthlyCount[]>>(`http://localhost:3000/api/v1/monthly-counts`, {
            params: {
                from: fromMonth,
                to: toMonth
            }
        });
    }

    getRoles(): Observable<APIResponse<Role[]>> {
        return this.http.get<APIResponse<Role[]>>(`http://localhost:3000/api/v1/roles`);
    }
}
