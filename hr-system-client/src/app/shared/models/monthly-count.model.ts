import { Role } from "./role.model";

export interface MonthlyCount {
    id?: number;
    monthOfYear: string;
    roleId?: number;
    role?: Role;
    existingCount: number;
    createdAt?: string;
    updatedAt?: string;
}
