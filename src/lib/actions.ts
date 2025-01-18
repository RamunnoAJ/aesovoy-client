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

export async function handleGoogleSignIn() {
  //try {
  const result = await signIn("google");
  console.log(result);

  return result;
  //} catch (e: any) {
  //  throw new Error("Failed to sign in with Google");
  //}
}
