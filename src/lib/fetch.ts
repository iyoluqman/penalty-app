"use server";

import { clearTokens, getTokens, setTokens } from "@/app/auth/cookies.server";
import { env } from "@/env.mjs";

import { redirect } from "next/navigation";

export async function authFetch(url: string, options?: RequestInit) {
  const { accessToken, refreshToken } = getTokens();
  let at = accessToken;
  if (!accessToken && !refreshToken) {
    return redirect("/logout");
  }

  if (!accessToken && refreshToken) {
    console.log("refreshing token in authFetch");
    at = await getNewToken();
  }

  return await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${at}`,
    },
  });
}

async function getNewToken() {
  const { refreshToken } = getTokens();

  const client = env.OAUTH_CLIENT_ID;
  const secret = env.OAUTH_CLIENT_SECRET;
  const response = await fetch(
    `${env.OAUTH_ISSUER_URL}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${client}:${secret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken!,
      }),
    }
  );
  console.log(response);
  if (!response.ok) {
    //log user out
    console.log("Refresh token failed - Token expired");
    clearTokens();
    return redirect("/logout");
  }
  // const data = await response.json();
  const data = (await response.json()) as {
    access_token: string;
    id_token: string;
    refresh_token: string;
  };
  if (data.access_token) {
    setTokens({
      accessToken: data.access_token,
      idToken: data.id_token,
      refreshToken: data.refresh_token,
    });
  }

  return data.access_token;
}
