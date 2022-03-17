import type { RequestHandler } from "@sveltejs/kit";

import { CLIENT_SECRET } from "$lib/envServer";

export const get: RequestHandler = async function get(request) {
	const code = request.url.searchParams.get("code");

	const response = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			client_id: import.meta.env.VITE_CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code
		})
	});

	const parsed = await response.json();
	const accessToken = parsed.access_token;

	request.locals.session.data = {
		accessToken
	};

	return {
		status: 303,
		headers: {
			"location": "/app/home"
		}
	};
}
