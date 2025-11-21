import {apiPrivate} from "./api";

export type Role = {
    id: string;
    name: string;
};

export type UserRoleResponse = {
    user_id: number;
    role: Role;
};

export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
};

export type RoleListResponse = {
    data: Role[];
    meta?: PaginationMeta;
};

export async function getRoles(): Promise<RoleListResponse> {
    return apiPrivate.get("roles").json<RoleListResponse>();
}

export async function getUserRole(userId: number | string): Promise<UserRoleResponse> {
    return apiPrivate.get(`users/${userId}/role`).json<UserRoleResponse>();
}

export type UpdateUserRoleInput = {
    role: "super_admin" | "dinas_operator" | "school_operator";
    school_id?: number;
};

export async function updateUserRole(userId: number | string, payload: UpdateUserRoleInput): Promise<UserRoleResponse> {
    return apiPrivate
        .put(`users/${userId}/role`, {
            json: payload,
        })
        .json<UserRoleResponse>();
}
