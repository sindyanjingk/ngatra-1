"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ForgotPasswordForm = {
  email: string;
};

type VerifyOTPForm = {
  otp: string;
};

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export function ForgotPasswordForm() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailForm = useForm<ForgotPasswordForm>();
  const otpForm = useForm<VerifyOTPForm>();
  const resetForm = useForm<ResetPasswordForm>();

  const handleSendOTP = async (data: ForgotPasswordForm) => {
    setEmail(data.email);

    // Simulasi pengiriman OTP ke email
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOTP);
    console.log("OTP (hanya untuk testing):", generatedOTP);

    toast.success("Kode OTP telah dikirim ke email!");
    setStep("otp");
  };

  const handleVerifyOTP = async (data: VerifyOTPForm) => {
    if (data.otp !== "123456") {
      otpForm.setError("otp", { message: "Kode OTP salah" });
      return;
    }

    toast.success("OTP benar, silakan atur ulang password.");
    setStep("reset");
  };

  const handleResetPassword = async (data: ResetPasswordForm) => {
    if (data.password !== data.confirmPassword) {
      resetForm.setError("confirmPassword", { message: "Konfirmasi password tidak cocok" });
      return;
    }

    // TODO: Panggil API untuk mengubah password user
    console.log("Password reset for:", email);

    toast.success("Password berhasil diubah! Silakan login.");
    setStep("email");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 md:w-1/3 flex flex-col space-y-3 items-center">
      <Image alt="Ngatra Panel" width={100} height={100} className="relative mx-auto h-20 w-auto" src="/ngatra-logo.svg" />
      
      {step === "email" && (
        <form onSubmit={emailForm.handleSubmit(handleSendOTP)} className="w-full flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...emailForm.register("email", { required: "Email tidak boleh kosong" })}
              id="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              className="mt-1 block w-full text-gray-900 rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-50"
            />
            {emailForm.formState.errors.email?.message && (
              <div className="text-red-500 mt-2">{emailForm.formState.errors.email.message}</div>
            )}
          </div>
          <button
            className="bg-blue-500 w-full py-2 px-3 rounded-full text-white font-bold uppercase flex justify-center items-center"
            type="submit"
            disabled={emailForm.formState.isSubmitting}
          >
            {emailForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Kirim OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="w-full flex flex-col space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-bold text-gray-600">
              Masukkan Kode OTP <span className="text-red-500">*</span>
            </label>
            <input
              {...otpForm.register("otp", { required: "Kode OTP tidak boleh kosong" })}
              id="otp"
              type="number"
              placeholder="123456"
              className="mt-1 block w-full text-gray-900 rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-50 text-center"
            />
            {otpForm.formState.errors.otp?.message && (
              <div className="text-red-500 mt-2">{otpForm.formState.errors.otp.message}</div>
            )}
          </div>
          <button
            className="bg-green-500 w-full py-2 px-3 rounded-full text-white font-bold uppercase flex justify-center items-center"
            type="submit"
            disabled={otpForm.formState.isSubmitting}
          >
            {otpForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Verifikasi OTP"}
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="w-full flex flex-col space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-600">
              Password Baru <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...resetForm.register("password", { required: "Password tidak boleh kosong" })}
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
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-600">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...resetForm.register("confirmPassword", { required: "Konfirmasi password tidak boleh kosong" })}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="mt-1 block w-full text-gray-900 rounded-full border border-gray-300 px-3 py-2 shadow-sm bg-gray-50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="bg-purple-500 w-full py-2 px-3 rounded-full text-white font-bold uppercase" type="submit">
            Reset Password
          </button>
        </form>
      )}

      <Link href="/login" className="text-sm text-blue-500 underline">
        Kembali ke Login
      </Link>
    </div>
  );
}
