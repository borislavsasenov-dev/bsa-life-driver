"use client";

import { buttonClass } from "../ui";

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const today = () => new Date().toISOString().slice(0, 10);

type Counts = { tasks: number; workouts: number; weight: number; notes: number };

export function ExportButtons({
  tasksCsv,
  workoutsCsv,
  weightCsv,
  notesCsv,
  counts,
}: {
  tasksCsv: string;
  workoutsCsv: string;
  weightCsv: string;
  notesCsv: string;
  counts: Counts;
}) {
  const date = today();

  const exportDailyLife = () => downloadCsv(`daily-life-${date}.csv`, tasksCsv);
  const exportFitness = () => {
    downloadCsv(`fitness-workouts-${date}.csv`, workoutsCsv);
    setTimeout(() => downloadCsv(`fitness-weight-${date}.csv`, weightCsv), 150);
  };
  const exportNotes = () => downloadCsv(`notebook-${date}.csv`, notesCsv);
  const exportAll = () => {
    exportDailyLife();
    setTimeout(() => downloadCsv(`fitness-workouts-${date}.csv`, workoutsCsv), 150);
    setTimeout(() => downloadCsv(`fitness-weight-${date}.csv`, weightCsv), 300);
    setTimeout(exportNotes, 450);
  };

  return (
    <div className="space-y-4">
      <button onClick={exportAll} className={buttonClass("primary", "brand", "md")}>
        Export All
      </button>

      <div className="grid gap-3 sm:grid-cols-3">
        <ExportCard label="Daily Life" count={counts.tasks} onExport={exportDailyLife} />
        <ExportCard label="Fitness" count={counts.workouts + counts.weight} onExport={exportFitness} />
        <ExportCard label="Notes" count={counts.notes} onExport={exportNotes} />
      </div>
    </div>
  );
}

function ExportCard({
  label,
  count,
  onExport,
}: {
  label: string;
  count: number;
  onExport: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-sm font-medium text-neutral-800">{label}</p>
      <p className="mt-0.5 text-sm text-neutral-500">
        {count} record{count === 1 ? "" : "s"}
      </p>
      <button onClick={onExport} className={`${buttonClass("secondary", "brand", "sm")} mt-3 w-full`}>
        Export {label}
      </button>
    </div>
  );
}
