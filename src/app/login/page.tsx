import { auth, signIn } from "@/auth";

export default async function Page() {
  const session = await auth();
  console.log(session);

  return (
    <form
      className="gap-4 flex flex-col"
      action={async (formData) => {
        "use server";
        try {
          await signIn("credentials", formData);
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
