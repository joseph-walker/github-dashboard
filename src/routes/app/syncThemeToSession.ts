import type { RequestHandler } from "@sveltejs/kit";

import type { HoardboardConfiguration } from "$lib/stores/configuration";

export const post: RequestHandler = async function post(request) {
	const theme = await request.request.text() as HoardboardConfiguration["theme"];

	request.locals.session.data = {
		...request.locals.session.data,
		theme
	};

	return {
		status: 200
	};
}
