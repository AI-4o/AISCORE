import Link from "next/link";
import { Form } from "app/form";
import { authenticate } from "app/lib/actions";
import { SubmitButton } from "app/submit-button";

export default function Login() {
  return (
    <div className="flex shadow-xl">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border bg-secondary-football border-gray-100">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form action={authenticate}>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {" for free."}
          </p>
        </Form>
      </div>
    </div>
  );
}
