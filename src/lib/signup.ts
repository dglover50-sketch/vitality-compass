import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";

/**
 * Submit an email signup / waitlist registration.
 * Returns { success: true } or throws on duplicate / error.
 */
export const submitSignup = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Valid email is required");
    }
    return { email: data.email.toLowerCase().trim() };
  })
  .handler(async ({ data }) => {
    const db = sql();
    await db`INSERT INTO signups (email) VALUES (${data.email})`;
    return { success: true };
  });
