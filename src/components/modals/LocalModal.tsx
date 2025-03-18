"use client";

import clsx from "clsx";
import { useCallback, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

export interface LocalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "default" | "alert" | "mobileFull";
  title?: string;
}

const LocalModal = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  title,
}: LocalModalProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex min-w-[375px] items-center justify-center bg-black/50",
      )}
      onClick={handleBackgroundClick}
    >
      <div
        className={clsx("relative w-full bg-white p-6", {
          "mx-4 max-w-[520px] rounded-lg": variant === "default",
          "mx-9 max-w-[450px] rounded-lg": variant === "alert",
          "h-full w-full sm:h-auto sm:w-[520px] sm:rounded-lg":
            variant === "mobileFull",
        })}
        onClick={e => e.stopPropagation()}
        aria-modal="true"
      >
        <div className="mb-5 flex items-center justify-between">
          {title && (
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          )}

          <button className="text-gray-700" onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default LocalModal;
