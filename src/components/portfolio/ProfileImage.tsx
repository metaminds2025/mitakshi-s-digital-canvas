import { cn } from "@/lib/utils";
import photo from "@/assets/mitakshi.jpg";

interface Props {
  className?: string;
  alt?: string;
  rounded?: "full" | "2xl" | "3xl";
  priority?: boolean;
}

/**
 * Single source of truth for Mitakshi's photo across the site.
 * Swap the import above to update everywhere.
 */
export function ProfileImage({ className, alt = "Mitakshi Sharma", rounded = "full", priority }: Props) {
  const radius =
    rounded === "full" ? "rounded-full" : rounded === "3xl" ? "rounded-[2rem]" : "rounded-3xl";
  return (
    <img
      src={photo}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("object-cover", radius, className)}
    />
  );
}

export { photo as profilePhoto };
