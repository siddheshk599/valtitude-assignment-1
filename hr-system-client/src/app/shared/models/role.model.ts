import { Department } from "./department.model";

export interface Role {
    id?: number;
    roleName: string;
    designationName: string;
    departmentId?: number;
    department?: Department;
    avgCompensation: number;
    createdAt?: string;
    updatedAt?: string;
}
