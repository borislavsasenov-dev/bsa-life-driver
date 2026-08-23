"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addTask(formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const category = formData.get("category") as string;
  const priority = formData.get("priority") as string;
  const due_date = (formData.get("due_date") as string) || null;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!title || !category) return;

  const { error } = await supabase.from("daily_life_tasks").insert({
    title,
    category,
    priority: priority || "Normal",
    due_date,
    notes,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function setTaskStatus(id: string, status: string) {
  const supabase = await createClient();

  const completed_date = status === "Done" ? new Date().toISOString().slice(0, 10) : null;

  const { error } = await supabase
    .from("daily_life_tasks")
    .update({ status, completed_date })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function deleteTask(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("daily_life_tasks").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}
