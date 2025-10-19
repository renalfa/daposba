import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateOnly(date: string) {
    const newDate = new Date(date);

    return dayjs(newDate).format("DD MMMM YYYY");
}
