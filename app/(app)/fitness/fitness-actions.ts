"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addWorkout(formData: FormData) {
  const supabase = await createClient();

  const session_date = formData.get("session_date") as string;
  const routine = (formData.get("routine") as string)?.trim();
  const durationRaw = formData.get("duration_minutes") as string;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!session_date || !routine) return;

  const { error } = await supabase.from("fitness_workouts").insert({
    session_date,
    routine,
    duration_minutes: durationRaw ? Number(durationRaw) : null,
    notes,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/fitness");
}

export async function deleteWorkout(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("fitness_workouts").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/fitness");
}

export async function addWeightLog(formData: FormData) {
  const supabase = await createClient();

  const log_date = formData.get("log_date") as string;
  const weightRaw = formData.get("weight_kg") as string;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!log_date || !weightRaw) return;

  const { error } = await supabase.from("fitness_weight_logs").insert({
    log_date,
    weight_kg: Number(weightRaw),
    notes,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/fitness");
}

export async function deleteWeightLog(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("fitness_weight_logs").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/fitness");
}
