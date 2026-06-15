import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {/* G Icon */}
      <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-primary/40 transition-shadow duration-300">
        <span className="text-white font-bold text-lg leading-none">G</span>
      </div>
      {/* Text */}
      {showText && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-gradient">Grow</span>
          <span className="text-foreground">via</span>
        </span>
      )}
    </Link>
  );
}
