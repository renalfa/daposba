import {getMenu} from "@/lib/services/menu";
import {useQuery} from "@tanstack/react-query";

export function useMenu() {
    return useQuery({
        queryKey: ["menu"],
        queryFn: () => getMenu(),
    });
}
