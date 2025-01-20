"use server";

import { signIn } from "@/auth";

export async function handleSignIn(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    return result;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function handleSignInGoogle() {
  const result = await signIn("google");
  return result;
}
