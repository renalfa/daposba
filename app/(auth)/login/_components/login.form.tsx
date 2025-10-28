"use client";

import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {HTTPError} from "ky";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Field, FieldDescription, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

import {LoginSchema, type LoginInput} from "@/lib/validators/auth";
import {login} from "@/lib/services/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {Eye, EyeClosed} from "lucide-react";

type Props = React.ComponentProps<"form"> & {
    onSuccess?: (res: {token: string; token_type: string; user: string}) => void;
};

export function LoginForm({className, onSuccess, ...props}: Props) {
    const router = useRouter();
    const sp = useSearchParams();
    const returnTo = sp.get("from") || "/";

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const onSubmit = async (values: LoginInput) => {
        try {
            const res = await login(values);

            if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", res.token);
                localStorage.setItem("tokenType", res.token_type);
                localStorage.setItem("user", JSON.stringify(res.user));
            }

            onSuccess?.(res);
            router.push(returnTo);
        } catch (err: unknown) {
            if (err instanceof HTTPError) {
                try {
                    const data = (await err.response.json()) as any;
                    const msg = data?.message || data?.error || "Email atau password salah. Coba lagi.";

                    setError("email", {message: undefined});
                    setError("password", {message: "Email atau password salah"});

                    toast.error(msg);
                } catch {
                    toast.error("Login gagal. Cek kredensial kamu.");
                }
            } else {
                toast.error("Terjadi kesalahan jaringan. Coba lagi.");
            }
        }
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} noValidate {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-2">
                        <img src="/assets/images/logo.png" alt="Image" className="h-20 w-20 rounded-full" />
                    </div>
                    <h1 className="text-2xl font-bold mt-6">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                    </p>
                </div>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </Field>

                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="*******"
                            aria-invalid={!!errors.password}
                            {...register("password")}
                        />
                        {showPassword ? (
                            <EyeClosed
                                size={20}
                                onClick={() => setShowPassword(false)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            />
                        ) : (
                            <Eye
                                size={20}
                                onClick={() => setShowPassword(true)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            />
                        )}
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                </Field>

                <Field>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </Field>

                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                            Sign up
                        </a>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
