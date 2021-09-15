import { handleSession } from "svelte-kit-cookie-session";

import { SESSION_SECRET } from "$lib/envServer";

export async function getSession({ locals }) {
	return locals.session.data;
}

export const handle = handleSession({
  	secret: SESSION_SECRET
});
