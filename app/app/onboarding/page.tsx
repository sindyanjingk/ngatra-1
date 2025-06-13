import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/form/onboarding-form";
import prisma from "@/lib/prisma";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  // Cek apakah user sudah punya website
  const existingSite = await prisma.sites.findFirst({
    where: {
      userId: session.user.id
    }
  });

  // Jika sudah punya website, redirect ke dashboard
  if (existingSite) {
    redirect(`/site/${existingSite.id}`);
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <OnboardingForm />
    </div>
  );
}