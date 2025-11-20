"use client";

import {useEffect, useMemo, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const PUBLIC_ROUTES = new Set<string>(["/login"]);
const TOKEN_KEY = "token";

export default function AuthGuard({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    const isPublic = useMemo(() => PUBLIC_ROUTES.has(pathname), [pathname]);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

        if (!token && !isPublic) {
            const next = encodeURIComponent(pathname || "/");
            router.replace(`/login?next=${next}`);
            return;
        }

        if (token && isPublic) {
            router.replace("/");
            return;
        }

        setChecking(false);
    }, [isPublic, pathname, router]);

    if (checking) {
        return (
            <div className="min-h-dvh grid w-full place-items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center">
                        <div className="size-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
