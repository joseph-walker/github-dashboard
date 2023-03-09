import { makeIso } from "./iso";

export function escapeUserName(userName: string) {
	return `_${userName.replace(/[^a-z0-9]/ig, "_")}`;
}

export const makeUserNameIso = makeIso(escapeUserName);
