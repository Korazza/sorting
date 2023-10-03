import { cn } from "@/lib/utils"

export const Button = (
	props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
	return (
		<button
			{...props}
			className={cn(
				"flex cursor-pointer rounded-lg border border-border-light bg-background-light p-neu font-medium text-text-light shadow-neu outline-none transition-shadow active:shadow-neu-inside motion-reduce:transition-none dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:shadow-neu-dark dark:active:shadow-neu-inside-dark",
				props.className
			)}
		>
			{props.children}
		</button>
	)
}
