import { createServerFn } from "@tanstack/react-start";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

type FeedbackData = {
  name: string;
  email: string;
  category: "suggestion" | "bug" | "feature" | "other";
  message: string;
};

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((data: { data: FeedbackData }) => {
    const d = data.data;
    if (!d.name?.trim() || !d.email?.trim() || !d.message?.trim()) {
      throw new Error("Name, email, and message are required");
    }
    if (!d.email.includes("@")) {
      throw new Error("Invalid email address");
    }
    return { data: { ...d, category: d.category || "other" } };
  })
  .handler(async ({ data }) => {
    const { name, email, category, message } = data.data;
    const timestamp = new Date().toISOString();
    const entry = { timestamp, name, email, category, message };

    // Store to disk (persists across server restarts in the .run directory)
    const dir = join(process.cwd(), ".run");
    await mkdir(dir, { recursive: true });
    const logPath = join(dir, "feedback.jsonl");

    // Append as JSONL (one JSON object per line)
    await writeFile(logPath, JSON.stringify(entry) + "\n", { flag: "a" });

    // Also write a unique file per submission for easy reference
    const slug = `feedback-${Date.now()}`;
    const filePath = join(dir, `${slug}.json`);
    await writeFile(filePath, JSON.stringify(entry, null, 2));

    console.log(`[feedback] ${name} (${email}) — ${category}: ${message.slice(0, 80)}...`);

    return { success: true, id: slug };
  });