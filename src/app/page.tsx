import { signOut } from "@/auth";

export default function Home() {
  return (
    <form
      className="gap-4 flex flex-col"
      action={async () => {
        "use server";
        try {
          await signOut();
        } catch (e) {
          console.log(e);
        }
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
