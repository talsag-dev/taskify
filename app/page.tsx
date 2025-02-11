import { getTasks } from "./actions";
import { AddTask } from "./components/add-task";
import { TasksViewer } from "./components/tasks-viewer/tasks-viewer";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="p-8">
      <p className="text-foreground mt-4">
        <span className="inline-block mb-4">
          Hi! 👋🏼 And welcome to Taskify, your personal task manager.
        </span>
        <span className="inline-block">
          Here you can manage your tasks efficiently and effortlessly. Start by
          adding a new task using the button below.
        </span>
      </p>

      <div className="flex flex-col mt-10">
        <AddTask />
      </div>
      <TasksViewer tasks={tasks} />
    </div>
  );
}
