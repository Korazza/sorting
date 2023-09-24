import { useAlgorithm } from "@/hooks/use-algorithm"

export const AlgorithmInfo = () => {
	const { algorithm } = useAlgorithm()

	if (!algorithm) {
		return null
	}

	return (
		<main className="flex w-full flex-col px-4 md:max-w-screen-md md:px-0">
			<article className="mt-6 w-full text-lg">
				<span className="mr-2 text-3xl font-semibold">{algorithm.label}</span>
				{algorithm.content}
			</article>
			<section className="flex flex-row justify-between sm:flex-col md:flex-row md:justify-between">
				<div>
					<h2 className="mt-6 text-center font-medium sm:text-start">
						Time complexity
					</h2>
					<div className="mt-3 flex flex-col gap-4 sm:flex-row">
						<div className="w-max break-keep rounded-lg p-neu font-medium text-text-light/70 shadow-neu dark:text-text-dark/60 dark:shadow-neu-dark">
							Worst-case
							<pre className="ml-2 inline font-serif text-xl font-light tracking-tighter text-text-light dark:text-text-dark">
								{algorithm.timeComplexity.worst}
							</pre>
						</div>
						<div className="w-max break-keep rounded-lg p-neu font-medium text-text-light/70 shadow-neu dark:text-text-dark/60 dark:shadow-neu-dark">
							Average
							<pre className="ml-2 inline font-serif text-xl font-light tracking-tighter text-text-light dark:text-text-dark">
								{algorithm.timeComplexity.average}
							</pre>
						</div>
						<div className="w-max break-keep rounded-lg p-neu font-medium text-text-light/70 shadow-neu dark:text-text-dark/60 dark:shadow-neu-dark">
							Best-case
							<pre className="ml-2 inline font-serif text-xl font-light tracking-tighter text-text-light dark:text-text-dark">
								{algorithm.timeComplexity.best}
							</pre>
						</div>
					</div>
				</div>
				<div>
					<h2 className="mt-6 text-center font-medium sm:text-end">
						Space complexity
					</h2>
					<div className="mt-4 w-max break-keep rounded-lg p-neu font-medium text-text-light/70 shadow-neu dark:text-text-dark/60 dark:shadow-neu-dark">
						Worst-case
						<pre className="ml-2 inline font-serif text-xl font-light tracking-tighter text-text-light dark:text-text-dark">
							{algorithm.spaceComplexity}
						</pre>
					</div>
				</div>
			</section>
		</main>
	)
}
