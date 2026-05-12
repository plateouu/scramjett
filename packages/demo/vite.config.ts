import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
	base: process.env.PUBLIC_BASE || "/",
	plugins: [
		viteStaticCopy({
			structured: false,
			targets: [
				{
					src: "node_modules/@mercuryworkshop/scramjet/dist/*",
					dest: "scramjet",
				},
				{
					src: "node_modules/@mercuryworkshop/scramjet-controller/dist/*",
					dest: "controller",
				},
			],
		}),
	],
};
