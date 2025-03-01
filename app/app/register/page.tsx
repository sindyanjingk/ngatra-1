import { SignupForm } from "@/components/form/signup-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-start w-screen md:p-12 flex-col gap-y-2 h-screen bg-gradient-to-br from-green-300 via-blue-300 to-blue-500">
      <SignupForm/>
    </div>
  );
}
