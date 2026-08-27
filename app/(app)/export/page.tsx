import { createClient } from "@/lib/supabase/server";
import { toCsv } from "./csv";
import { ExportButtons } from "./export-buttons";

export default async function ExportPage() {
  const supabase = await createClient();

  const [{ data: tasks }, { data: workouts }, { data: weightLogs }, { data: notes }] =
    await Promise.all([
      supabase
        .from("daily_life_tasks")
        .select("title, category, priority, status, due_date, completed_date, notes, created_at")
        .order("created_at", { ascending: true }),
      supabase
        .from("fitness_workouts")
        .select("session_date, routine, duration_minutes, notes, created_at")
        .order("session_date", { ascending: true }),
      supabase
        .from("fitness_weight_logs")
        .select("log_date, weight_kg, notes, created_at")
        .order("log_date", { ascending: true }),
      supabase
        .from("notebook_entries")
        .select("name, type, notes, created_at")
        .order("created_at", { ascending: true }),
    ]);

  const tasksCsv = toCsv(tasks ?? [], [
    "title",
    "category",
    "priority",
    "status",
    "due_date",
    "completed_date",
    "notes",
    "created_at",
  ]);
  const workoutsCsv = toCsv(workouts ?? [], [
    "session_date",
    "routine",
    "duration_minutes",
    "notes",
    "created_at",
  ]);
  const weightCsv = toCsv(weightLogs ?? [], ["log_date", "weight_kg", "notes", "created_at"]);
  const notesCsv = toCsv(notes ?? [], ["name", "type", "notes", "created_at"]);

  return (
    <div>
      <h1 className="mb-2 text-lg font-semibold text-neutral-900">Export</h1>
      <p className="mb-6 text-sm text-neutral-500">
        Download your data as CSV files — open them in Excel or Google Sheets, or upload them to an
        AI tool for analysis.
      </p>

      <ExportButtons
        tasksCsv={tasksCsv}
        workoutsCsv={workoutsCsv}
        weightCsv={weightCsv}
        notesCsv={notesCsv}
        counts={{
          tasks: tasks?.length ?? 0,
          workouts: workouts?.length ?? 0,
          weight: weightLogs?.length ?? 0,
          notes: notes?.length ?? 0,
        }}
      />
    </div>
  );
}
