import { cookies } from "next/headers";

export function setTokens({
  accessToken,
  idToken,
  refreshToken,
  expiresIn,
  refreshExpiresIn,
}: {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
}) {
  if (accessToken) {
    cookies().set("accessToken", accessToken, {
      maxAge: expiresIn ?? 300,
    });
  }
  if (idToken) {
    cookies().set("idToken", idToken);
  }
  if (refreshToken) {
    cookies().set("refreshToken", refreshToken, {
      maxAge: refreshExpiresIn ?? 1800,
    });
  }
}

export function clearTokens() {
  cookies().delete("accessToken");
  cookies().delete("idToken");
  cookies().delete("refreshToken");
  cookies().delete("code");
}

export function getTokens() {
  const accessToken = cookies().get("accessToken")?.value;
  const idToken = cookies().get("idToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  return { accessToken, idToken, refreshToken };
}
