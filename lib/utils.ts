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

export function formatRupiah(value: number | string | null | undefined) {
    if (!value) return "-";

    const num = typeof value === "string" ? parseInt(value) : value;

    return num.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
}

