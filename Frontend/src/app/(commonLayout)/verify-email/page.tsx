"use client";
export const dynamic = "force-dynamic";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; 
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    authClient
      .verifyEmail({
        query: { token },
      })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      {status === "loading" && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Verifying your email...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="h-12 w-12 text-green-600" />
          <p className="text-lg font-semibold text-green-600">Email Verified Successfully</p>
          <a
            href="/login"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Go to Login
          </a>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="h-12 w-12 text-red-600" />
          <p className="text-lg font-semibold text-red-600">Verification failed or token expired</p>
          <a href="/resend-verification" className="mt-4 inline-block text-blue-600 hover:underline">
            Resend verification email
          </a>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center border dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MediStore</h1>

        <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mt-6" />}>
          <VerifyEmailContent />
        </Suspense>

        <p className="mt-6 text-xs text-gray-500">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </p>
      </div>
    </div>
  );
}