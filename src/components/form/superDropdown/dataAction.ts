"use server";

import { env } from "@/env.mjs";
import { authFetch } from "@/lib/fetch";

export async function getData(endpoint: string) {
  const url = `${env.API_URL}${endpoint}`;
  const res = await authFetch(url);
  const json = (await res.json()) as RefCodesDTO[] | ProblemDetailsDTO;
  return json;
}
