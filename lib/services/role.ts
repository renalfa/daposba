import {api} from "./api";

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

const token = localStorage.getItem("token");

export async function getRoles(): Promise<RoleListResponse> {
    return api
        .get("roles", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<RoleListResponse>();
}

export async function getUserRole(userId: number | string): Promise<UserRoleResponse> {
    return api
        .get(`users/${userId}/role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<UserRoleResponse>();
}

export type UpdateUserRoleInput = {
    role: "super_admin" | "dinas_operator" | "school_operator";
    school_id?: number;
};

export async function updateUserRole(userId: number | string, payload: UpdateUserRoleInput): Promise<UserRoleResponse> {
    return api
        .put(`users/${userId}/role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: payload,
        })
        .json<UserRoleResponse>();
}
