import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function LoadingSkeleton({
  width,
  height,
  className,
  rounded = "lg",
}: LoadingSkeletonProps) {
  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        roundedClass,
        className
      )}
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
      }}
    />
  );
}
