import { browser } from "$app/env";

// Vite loads env variables into server AND client code.
// We don't want that - there's sensitive info in there.
// We have to call dotenv manually if we want to load everything - but we
// only want to do that on the server.
if (browser) {
	throw new Error("Import not allowed outside server context");
}

import dotenv from "dotenv";

try {
	dotenv.config();
} catch (err) {
	// dotenv errors on client - but that's okay, it should never be running
	// there anyway
}

export const CLIENT_SECRET = process.env["CLIENT_SECRET"];
export const SESSION_SECRET = process.env["SESSION_SECRET"];
