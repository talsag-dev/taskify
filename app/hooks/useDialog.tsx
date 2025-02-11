"use client";
import { useState } from "react";

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  return { isDialogOpen, openDialog, closeDialog, toggleDialog };
};
