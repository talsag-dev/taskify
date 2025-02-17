import { useRouter, useSearchParams } from "next/navigation";

export interface TaskFilters {
  priorities?: string[];
  hideCompleted?: boolean;
}

export const useFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    priorities: searchParams.getAll("priority") || [],
    hideCompleted: searchParams.get("hideCompleted") === "true",
  };

  const applyFilters = (newFilters: TaskFilters) => {
    const params = new URLSearchParams();

    newFilters.priorities?.forEach((priority) => {
      params.append("priority", priority);
    });
    if (newFilters.hideCompleted) params.set("hideCompleted", "true");

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("?"); // Reset the URL to remove all filters
  };

  return { filters, applyFilters, clearFilters };
};
