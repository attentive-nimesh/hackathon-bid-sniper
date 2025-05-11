export function formatCustomDate(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);

  const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Thu"
  const month = date.toLocaleDateString("en-US", { month: "short" }); // e.g., "May"
  const day = String(date.getDate()).padStart(2, "0"); // e.g., "08"
  const year = String(date.getFullYear()); // e.g., "2025"

  return `${dayName}, ${year}, ${month}, ${day}`;
}
