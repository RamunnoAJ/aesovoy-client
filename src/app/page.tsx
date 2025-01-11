"use client";
export default function Home() {
  async function handleClick() {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "test@test.com", password: "test" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  }

  return <button onClick={handleClick}>asd</button>;
}
