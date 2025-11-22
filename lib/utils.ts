import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/id";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateOnly(date: string | null) {
    if (date === "" || date === null) return "-";

    return dayjs(date).locale("id").format("DD MMMM YYYY");
}
