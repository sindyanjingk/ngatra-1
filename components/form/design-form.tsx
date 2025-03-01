"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import va from "@vercel/analytics";
import Uploader from "./uploader";
import { Loader2Icon } from "lucide-react";

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit?: any;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();

  return (
    <form
      action={async (data: FormData) => {
        if (
          inputAttrs.name === "customDomain" &&
          inputAttrs.defaultValue &&
          data.get("customDomain") !== inputAttrs.defaultValue &&
          !confirm("Are you sure you want to change your custom domain?")
        ) {
          return;
        }

        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
            if (id) {
              router.refresh();
            } else {
              await update();
              router.refresh();
            }
            toast.success(`Successfully updated ${inputAttrs.name}!`);
          }
        });
      }}
      className="rounded-lg border border-gray-300 bg-white dark:border-stone-700 dark:bg-black shadow-md"
    >
      {/* Form Content */}
      <div className="relative flex flex-col space-y-4 p-6 sm:p-10">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>

        {/* Conditional Input Rendering */}
        {inputAttrs.name === "image" || inputAttrs.name === "logo" ? (
          <Uploader
            siteId=""
            defaultValue={inputAttrs.defaultValue}
            name={inputAttrs.name}
          />
        ) : inputAttrs.name === "font" ? (
          <div className="flex max-w-sm items-center overflow-hidden rounded-lg border border-gray-300 dark:border-stone-600">
            <select
              name="font"
              defaultValue={inputAttrs.defaultValue}
              className="w-full border-none bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none dark:bg-black dark:text-gray-200"
            >
              <option value="font-cal">Cal Sans</option>
              <option value="font-lora">Lora</option>
              <option value="font-work">Work Sans</option>
            </select>
          </div>
        ) : inputAttrs.name === "subdomain" ? (
          <div className="flex w-full max-w-md">
            <input
              {...inputAttrs}
              required
              className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
            />
            <div className="flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-gray-400">
              {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        ) : inputAttrs.name === "customDomain" ? (
          <div className="relative flex w-full max-w-md">
            <input
              {...inputAttrs}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
            />
            {inputAttrs.defaultValue && (
              <div className="absolute right-3 flex items-center">
               
              </div>
            )}
          </div>
        ) : inputAttrs.name === "description" ? (
          <textarea
            {...inputAttrs}
            rows={3}
            required
            className="w-full max-w-xl rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
          />
        ) : (
          <input
            {...inputAttrs}
            required
            className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:border-stone-600 dark:bg-black dark:text-white"
          />
        )}
      </div>

      {/* Domain Configuration */}
      {/* {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
        
      )} */}

      {/* Help Text and Submit Button */}
      <div className="flex flex-col items-center justify-center space-y-3 border-t border-gray-300 bg-gray-50 p-4 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
        <FormButton />
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white"
      )}
      disabled={pending}
    >
      {pending ? <Loader2Icon className="animate-spin" /> : "Save Changes"}
    </button>
  );
}
