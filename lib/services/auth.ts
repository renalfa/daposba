import {api} from "./api";
import type {LoginInput} from "@/lib/validators/auth";

export type LoginResponse = {
    user: string;
    token: string;
    token_type: "Bearer" | string;
};

const token = localStorage.getItem("token");

export async function login(input: LoginInput): Promise<LoginResponse> {
    return api.post("auth/login", {json: input}).json<LoginResponse>();
}

export async function logout(): Promise<{message: string}> {
    return api
        .post("auth/logout", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<{message: string}>();
}

export type RegisterInput = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role?: "super_admin" | "dinas_operator" | "school_operator";
    school_id?: number;
};

export type RegisterResponse = {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        school_id?: number | null;
    };
    token: string;
    token_type: string;
};

export async function registerUser(payload: RegisterInput): Promise<RegisterResponse> {
    return api
        .post("auth/register", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: payload,
        })
        .json<RegisterResponse>();
}
