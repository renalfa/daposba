import {getMenu, MenuResponse} from "@/lib/services/menu";
import {useQuery} from "@tanstack/react-query";

export function useMenu() {
    return useQuery<MenuResponse, Error>({
        queryKey: ["menu"],
        queryFn: () => getMenu(),
    });
}
