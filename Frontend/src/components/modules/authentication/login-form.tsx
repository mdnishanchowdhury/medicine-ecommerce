"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin + callbackUrl
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {

      const toastId = toast.loading("Loging your account...");

      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Account Login successfully.", { id: toastId });
        router.push(callbackUrl);
        router.refresh();

      } catch (error) {
        toast.error("An unexpected error occurred. Please try again later.", { id: toastId });
      }
    }
  });



  return (
    <Card {...props}>
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Sign in to continue to <span className="font-semibold">MediStore</span>
        </CardDescription>
      </CardHeader>

      <form
        className="px-5"
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-3"
        >
          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
