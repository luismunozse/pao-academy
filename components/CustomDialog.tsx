'use client';

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function CustomDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-xl rounded-3xl border border-white/12",
          "bg-gradient-to-br from-[#0d172a]/95 to-[#0b1224]/95 backdrop-blur-md",
          "p-6 md:p-8 text-white",
          "shadow-[0_24px_90px_rgba(0,0,0,0.45)]",
          // Gradiente superior
          "before:absolute before:inset-x-0 before:top-0 before:h-[2px]",
          "before:bg-gradient-to-r before:from-[#2563EB] before:via-[#0EA5E9] before:to-[#7c3aed]",
          "before:content-['']",
          className
        )}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-xl font-semibold text-white">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-white/70 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="space-y-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;
