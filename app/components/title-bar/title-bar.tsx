"use client";

import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "../theme-toggle";
import { DoorClosedIcon } from "lucide-react";
export const TitleBar = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-row justify-between items-center w-full p-4">
      <h1 className="text-4xl text-primary font-extrabold">Taskify</h1>

      <div className="flex items-center">
        <ThemeToggle />
        {status === "authenticated" && (
          <div className="flex items-center gap-2">
            <DoorClosedIcon
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="text-red-500 hover:text-red-300 hover:cursor-pointer m-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};
