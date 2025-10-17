import {Home, Database, UserRound, type LucideIcon} from "lucide-react";

export type MenuItem = {
    title: string;
    url: string;
    items: MenuItem[] | null;
};

export type MenuNode = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items: MenuItem[] | null;
};

export const menus: MenuNode[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: false,
        items: null,
    },
    {
        title: "Data Pokok",
        url: "#",
        icon: Database,
        isActive: true,
        items: [
            {title: "Kepala Sekolah", url: "/headmaster", items: null},
            {title: "Guru", url: "/teacher", items: null},
            {title: "Peserta Didik", url: "/student", items: null},
            {
                title: "Sekolah",
                url: "/school",
                items: [
                    {title: "Kode Registrasi", url: "/school/registration-code", items: null},
                    {title: "Data Administrasi", url: "/school/administration-data", items: null},
                    {title: "Rombel", url: "/school/rombel", items: null},
                    {title: "Ruang Kelas", url: "/school/class", items: null},
                    {title: "Peserta Didik", url: "/school/student", items: null},
                    {title: "Laboratorium", url: "/school/lab", items: null},
                    {title: "Ruang Guru", url: "/school/teacher-room", items: null},
                    {title: "WC", url: "/school/wc", items: null},
                    {title: "Lain-lain", url: "/school/other", items: null},
                ],
            },
        ],
    },
    {
        title: "Pengguna",
        url: "#",
        icon: UserRound,
        isActive: false,
        items: [
            {title: "Data Pengguna", url: "/user/data", items: null},
            {title: "Register Pengguna", url: "/user/register", items: null},
            {title: "Role Pengguna", url: "/user/role", items: null},
            {title: "Logs", url: "/user/logs", items: null},
        ],
    },
];
