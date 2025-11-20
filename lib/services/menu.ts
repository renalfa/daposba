import {api} from "./api";

export type MenuResponse = {
    id: number;
    name: string;
    icon?: string;
    route?: string;
    children?: MenuResponse[];
};

export async function getMenu(): Promise<MenuResponse[]> {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token not found");
    }

    return api
        .get("menu", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<MenuResponse[]>();
}
