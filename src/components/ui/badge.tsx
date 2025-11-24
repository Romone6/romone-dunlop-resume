import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    className?: string;
}

export function Badge({ children, className, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border border-divider px-3 py-1 text-sm font-medium transition-colors",
                "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-gray-100",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
