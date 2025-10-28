import ky from "ky";

const BASE_URL = process.env.API_BASE_URL ?? "http://aji.local:8000/api/v1";

export const api = ky.create({
    prefixUrl: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
