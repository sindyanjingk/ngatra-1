import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OnboardForm from "@/components/form/onboard";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center w-screen md:p-12 flex-col gap-y-2 min-h-screen bg-gradient-to-br from-white via-blue-200 to-blue-300 p-4">Add commentMore actions
      <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 md:w-2/5 flex flex-col space-y-3 items-center">
        <div className="text-lg text-gray-900 font-bold border p-4 rounded-lg">Make New Panel</div>
        <OnboardForm />
      </div>
    </div>
  );
}