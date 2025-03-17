import Link from "next/link";
import SignupForm from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign Up - Comic App",
  description: "Create a new account on Comic App",
};

export default function SignupPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details to create your Comic App account
        </p>
      </div>
      
      <SignupForm />

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}