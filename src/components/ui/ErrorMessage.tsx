import { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className = "" }: ErrorMessageProps) {
  return (
    <div className={`text-red-600 text-sm ${className}`}>
      {children}
    </div>
  );
}
