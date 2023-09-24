/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: { light: "#ecf0f0", dark: "#303135" },
				border: { light: "#ffffff33", dark: "#3e3f4633" },
				text: {
					light: "#7b808c",
					dark: "#e8e8e8",
				},
				bar: {
					1: "#31beff",
					2: "#5451ff",
					yellow: {
						1: "#fde62d",
						2: "#ff8a00",
					},
					red: {
						1: "#ff61dc",
						2: "#e82727",
					},
					purple: {
						1: "#d261ff",
						2: "#8b27e8",
					},
					sorted: {
						1: "#65e770",
						2: "#2bb700d3",
					},
				},
			},
			padding: {
				neu: "0.5rem 0.75rem",
			},
			boxShadow: {
				neu: "-6px -6px 16px #ffffff, 6px 6px  16px #d1d9e6, inset 0 0 0 #ffffff, inset 0 0 0 #d1d9e6",
				"neu-inside":
					"0 0 0 #ffffff, 0 0 0 #d1d9e6, inset -3px -3px 8px #ffffff, inset 3px 3px 8px #d1d9e6",
				"neu-dark":
					"-4px -4px 16px #3e3f46, 4px 4px  16px #232323, inset 0 0 0 #3e3f46, inset 0 0 0 #232323",
				"neu-inside-dark":
					"0 0 0 #3e3f46, 0 0 0 #232323, inset -2px -2px 8px #3e3f46, inset 2px 2px 8px #232323",

				"neu-xl":
					"-8px -8px 20px #ffffff, 8px 8px  20px #d1d9e6, inset 0 0 0 #ffffff, inset 0 0 0 #d1d9e6",
				"neu-xl-inside":
					"0 0 0 #ffffff, 0 0 0 #d1d9e6, inset -4px -4px 10px #ffffff, inset 4px 4px 10px #d1d9e6",
				"neu-xl-dark":
					"-6px -6px 20px #3e3f46, 6px 6px  20px #232323, inset 0 0 0 #3e3f46, inset 0 0 0 #232323",
				"neu-xl-inside-dark":
					"0 0 0 #3e3f46, 0 0 0 #232323, inset -3px -3px 10px #3e3f46, inset 3px 3px 10px #232323",
			},
		},
	},

	plugins: [],
}
