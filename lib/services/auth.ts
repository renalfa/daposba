import {api} from "./api";
import type {LoginInput, LoginResponse} from "@/lib/validators/auth";

export async function login(input: LoginInput): Promise<LoginResponse> {
    return api.post("login", {json: input}).json<LoginResponse>();
}
