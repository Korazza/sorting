import { cn } from "@/lib/utils"

type TooltipProps = {
	label: string
	side?: "top" | "right" | "bottom" | "left"
}

const sideClassNames: Record<NonNullable<TooltipProps["side"]>, string> = {
	top: "bottom-[125%] left-[50%] -translate-x-[50%]",
	right: "left-[125%] top-[50%] -translate-y-[50%]",
	bottom: "top-[125%] left-[50%] -translate-x-[50%]",
	left: "right-[125%] top-[50%] -translate-y-[50%]",
}

export const Tooltip = ({
	className,
	children,
	label,
	side = "bottom",
	...props
}: React.HTMLAttributes<HTMLDivElement> & TooltipProps) => {
	return (
		<div {...props} className={cn("group relative", className)}>
			<span
				className={`pointer-events-none absolute w-max rounded-lg bg-text-light/90 px-2 py-1 text-text-dark opacity-0 shadow-md transition-opacity group-hover:opacity-100 dark:bg-text-dark/90 dark:text-text-light ${sideClassNames[side]}`}
			>
				{label}
			</span>
			{children}
		</div>
	)
}
