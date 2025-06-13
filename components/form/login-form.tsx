"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AuthForm = {
    email: string;
    password: string;
};

export function LoginForm() {
    const {
        formState: { isSubmitting, errors },
        register,
        handleSubmit,
        setError,
    } = useForm<AuthForm>();

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const handleAuth = async (data: AuthForm) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: "/"
            });
            console.log({ result });
            if (result?.error) {
                setError("password", { message: "Email atau password salah" });
                toast.error("Login gagal, periksa kembali email dan password.");
            } else if (result?.ok) {
                toast.success("Login berhasil.");
                // Wait a bit for session to be established, then redirect
                setTimeout(() => {
                    router.push("/");
                    router.refresh();
                }, 500);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Terjadi kesalahan saat login.");
        }
    };

    const handleGoogleLogin = async () => {
        const response = await signIn("google", { redirect: true, callbackUrl: "/" });
        console.log({response});
    };

    return (
        <form
            onSubmit={handleSubmit(handleAuth)}
            className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 md:w-1/3 flex flex-col space-y-3 items-center"
        >
            <Image
                alt="Ngatra Panel"
                width={100}
                height={100}
                className="relative mx-auto h-20 w-auto borderdark:scale-110 dark:border-gray-700"
                src="/ngatra-logo.svg"
            />
            <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-full shadow hover:bg-gray-100"
            >
                <Image src={"/google-button.png"} alt="Google Logo" width={20} height={20} />
                Sign in with Google
            </button>
            <div className="relative w-full flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="w-full">
                <label htmlFor="email" className="block text-sm font-bold text-gray-600">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    {...register("email", { required: "Email tidak boleh kosong" })}
                    id="email"
                    type="email"
                    placeholder="user@acme.com"
                    autoComplete="email"
                    className="mt-1 block w-full text-gray-900 rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-50"
                />
                {errors.email?.message && <div className="text-red-500 mt-2">{errors.email.message}</div>}
            </div>

            <div className="w-full relative">
                <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-600 flex justify-between"
                >
                    <span>Password <span className="text-red-500">*</span></span>
                    <Link href="/login?redirect=forgot-password" className="text-sm underline">
                        Forgot Password?
                    </Link>
                </label>
                <div className="relative">
                    <input
                        {...register("password", { required: "Password tidak boleh kosong" })}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="mt-1 block w-full text-gray-900 rounded-full border border-gray-300 px-3 py-2 shadow-sm bg-gray-50 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password?.message && <div className="text-red-500 mt-2">{errors.password.message}</div>}
            </div>

            <button
                className="bg-gradient-to-r w-4/5 from-blue-500 via-purple-800 to-purple-400 py-2 px-3 rounded-full hover:from-purple-400 hover:to-blue-500 font-bold uppercase flex justify-center items-center"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign in"}
            </button>

            <span className="text-gray-800 text-xs text-center font-semibold">
                By signing up you agree with our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
            </span>

            <div className="text-sm font-bold text-gray-800 text-center">
                {`Don't have an account?`}{" "}
                <Link href="/register" className="text-orange-500 font-bold hover:text-orange-400">
                    Sign Up
                </Link>
            </div>
        </form>
    );
}
