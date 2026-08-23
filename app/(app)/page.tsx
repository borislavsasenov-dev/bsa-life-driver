import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "./task-form";
import { TaskList } from "./task-list";

export default async function DailyLifePage() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase
    .from("daily_life_tasks")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-sm text-red-600">Failed to load tasks: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold text-stone-800">Daily Life</h1>
      <TaskForm />
      <TaskList tasks={tasks ?? []} />
    </div>
  );
}
