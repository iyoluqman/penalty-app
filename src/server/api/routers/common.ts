import { z } from "zod";

import { env } from "@/env.mjs";
import { authFetch } from "@/lib/fetch";
import { appendQueryParams } from "@/lib/search";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const commonRouter = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        endpoint: z.string(),
        searchParams: z.custom<SearchParams>().optional(),
      })
    )
    .query(async ({ input }) => {
      const { endpoint, searchParams } = input;
      const url = `${env.API_URL}${endpoint}`;
      // const url = endpoint;
      const query = appendQueryParams(new URL(url), searchParams ?? {});
      const res = await authFetch(query.href);
      const json = (await res.json()) as unknown[];
      return json;
    }),
  getDataPaging: publicProcedure
    .input(
      z.object({
        endpoint: z.string(),
        searchParams: z.custom<SearchParams>(),
      })
    )
    .query(async ({ input }) => {
      const { endpoint, searchParams } = input;

      const url = `${env.API_URL}${endpoint}`;
      // const url = endpoint;
      const query = appendQueryParams(new URL(url), searchParams);
      const res = await authFetch(query.href);
      const json = (await res.json()) as PaginateResponse;
      return json;
    }),
  getDropdownData: publicProcedure
    .input(
      z.object({
        endpoint: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { endpoint } = input;
      const url = `${env.API_URL}${endpoint}`;
      const res = await authFetch(url);
      const json = (await res.json()) as RefCodesDTO[] | ProblemDetailsDTO;

      return json;
    }),
  getTestData: publicProcedure
    .input(
      z.object({
        drugSeqno: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { drugSeqno } = input;
      const url = `${env.API_URL}/api/v1/order/utils/dosage_unit/${drugSeqno}`;
      const query = new URL(url);
      const res = await authFetch(query.href);
      const json = (await res.json()) as PatientAllergy[] | ProblemDetailsDTO;

      return json;
    }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
