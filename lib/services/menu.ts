import {apiPrivate} from "./api";

export type Ability = string;

export interface MenuItem {
    key: string;
    label: string;
    icon: string;
    route: string;
    abilities?: Ability[];
}

export interface MenuResponse {
    role: string;
    menus: MenuItem[];
}

export async function getMenu(): Promise<MenuResponse> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    return apiPrivate.get("menu").json<MenuResponse>();
}
