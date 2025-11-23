"use client";

import {create} from "zustand";
import {persist} from "zustand/middleware";

export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    school_id: number | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

type AuthState = {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({token, user}),
            clearAuth: () => set({token: null, user: null}),
        }),
        {
            name: "auth",
        }
    )
);
