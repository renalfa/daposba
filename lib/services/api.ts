import ky from "ky";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://103.94.238.41:9000/api/v1";

/**
 * PUBLIC API (tanpa token)
 */
export const apiPublic = ky.create({
    prefixUrl: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/**
 * PRIVATE API (dengan token otomatis dari localStorage)
 */
export const apiPrivate = ky.create({
    prefixUrl: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    hooks: {
        beforeRequest: [
            (request) => {
                if (typeof window !== "undefined") {
                    const token = localStorage.getItem("token");

                    if (token) {
                        request.headers.set("Authorization", `Bearer ${token}`);
                    }
                }
            },
        ],
    },
});
