import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async function get(request) {
	request.locals.session.data = {};

	return {
		status: 303,
		headers: {
			"location": "/"
		}
	};
}
