import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async function get(request) {
	const session = {
		...request.locals.session.data
	};

	delete session.accessToken;

	request.locals.session.data = session;

	return {
		status: 301,
		headers: {
			"location": "/",
			"cache-control": "no-store",
		}
	};
}
