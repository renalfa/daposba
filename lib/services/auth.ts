import {api} from "./api";
import type {LoginInput} from "@/lib/validators/auth";

export type LoginResponse = {
    user: string;
    token: string;
    token_type: "Bearer" | string;
};

export async function login(input: LoginInput): Promise<LoginResponse> {
    return api.post("auth/login", {json: input}).json<LoginResponse>();
}

// {
//     "user": {
//         "id": 1,
//         "name": "Jane Doe",
//         "email": "jane@example.com",
//         "email_verified_at": null,
//         "created_at": "2025-11-20T14:51:39.000000Z",
//         "updated_at": "2025-11-20T14:51:39.000000Z",
//         "role": "school_operator",
//         "school_id": 1
//     },
//     "token": "3|pBCvonyAhgy7tQARmvvibDRYOzllMrO9Vm6CkIfebb8c1f0c"
// }