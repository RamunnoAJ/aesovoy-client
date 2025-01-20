import apiClient from "@/lib/apiClient";

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post(
      "/auth/login",
      { email, password },
      { skipAuth: true },
    );

    return response.data;
  } catch (e: any) {
    console.error("Axios Error:", e.response?.data || e.message);
    throw new Error("Failed login with credentials attempt");
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await apiClient.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return response.data;
  } catch (e: any) {
    console.error("Axios Error:", e.response?.data || e.message);
    throw new Error("Failed refresh token attempt");
  }
}

export async function findUserByEmail(email: string) {
  try {
    const response = await apiClient.post(
      "/auth/email-provider",
      { email },
      { skipAuth: true },
    );

    return response.data;
  } catch (e: any) {
    console.error("Axios Error:", e.response?.data || e.message);
    throw new Error("Failed login with google attempt");
  }
}
