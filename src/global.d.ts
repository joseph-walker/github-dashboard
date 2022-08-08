/// <reference types="@sveltejs/kit" />

interface SessionData {
	accessToken?: string;
	theme?: import("$lib/stores/configuration").HoardboardConfiguration["theme"];
}

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		session: import("svelte-kit-cookie-session").Session<SessionData>;
		cookies: Record<string, string>; // all parsed cookies are automatically set from handleSession to avoid overhead
	}

	interface Platform {}

	interface Session extends SessionData {}
}
