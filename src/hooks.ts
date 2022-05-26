import type { GetSession } from "@sveltejs/kit";

import { handleSession } from "svelte-kit-cookie-session";

import { SESSION_SECRET } from "$lib/envServer";

export const getSession: GetSession = async function getSession({ locals }) {
	return locals.session.data;
}

export const handle = handleSession({
  	secret: SESSION_SECRET
});
