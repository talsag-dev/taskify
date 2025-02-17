import { getTasks } from "./actions";
import { TasksHeader } from "./components/tasks-header";
import { TasksViewer } from "./components/tasks-viewer/tasks-viewer";
export interface FilterParams {
  hideCompleted: string;
  priority: string[] | string;
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<FilterParams>;
}) {
  const { priority, hideCompleted: hideCompletedParam } = await searchParams;
  const hideCompleted = hideCompletedParam === "true";
  const tasks = await getTasks({
    priorities: Array.isArray(priority) ? priority : priority ? [priority] : [],
    hideCompleted,
  });

  return (
    <div className="p-8">
      {!(tasks.length > 0) && (
        <p className="text-foreground my-4">
          <span className="inline-block mb-4">
            Hi! 👋🏼 And welcome to Taskify, your personal task manager.
          </span>
          <span className="inline-block">
            Here you can manage your tasks efficiently and effortlessly. Start
            by adding a new task using the button below.
          </span>
        </p>
      )}
      <div className="flex flex-col">
        <TasksHeader />
      </div>
      <TasksViewer tasks={tasks} />
    </div>
  );
}
