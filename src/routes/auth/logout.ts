import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async function get(request) {
	// TODO: Clear this on logout without nuking server-side config
	request.locals.session.data = {};

	return {
		status: 303,
		headers: {
			"location": "/"
		}
	};
}
