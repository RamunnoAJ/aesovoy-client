import { Leaf } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="size-4" />
          </div>
          A eso voy! Plant Based
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
