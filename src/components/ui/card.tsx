import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-divider bg-white p-6 shadow-sm dark:bg-white/5",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
