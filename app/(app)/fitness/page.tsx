import { createClient } from "@/lib/supabase/server";
import { WorkoutForm } from "./workout-form";
import { WorkoutList } from "./workout-list";
import { WeightForm } from "./weight-form";
import { WeightList } from "./weight-list";

export default async function FitnessPage() {
  const supabase = await createClient();

  const [{ data: workouts, error: workoutsError }, { data: weightLogs, error: weightError }] =
    await Promise.all([
      supabase
        .from("fitness_workouts")
        .select("*")
        .order("session_date", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("fitness_weight_logs")
        .select("*")
        .order("log_date", { ascending: false })
        .order("created_at", { ascending: false }),
    ]);

  if (workoutsError || weightError) {
    return (
      <p className="text-sm text-red-600">
        Failed to load fitness data: {workoutsError?.message ?? weightError?.message}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-4 text-lg font-semibold text-neutral-900">Workouts</h1>
        <WorkoutForm />
        <WorkoutList workouts={workouts ?? []} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Weight</h2>
        <WeightForm />
        <WeightList logs={weightLogs ?? []} />
      </div>
    </div>
  );
}
