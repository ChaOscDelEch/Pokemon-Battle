"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`relative perspective-1000 ${className}`}>
      <div className="w-full h-full transition-transform duration-700 preserve-3d hover:rotate-y-180">
        {children}
      </div>
    </div>
  );
}
