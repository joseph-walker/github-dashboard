import { makeIso } from "./iso";

export function escapeRepositoryName(repositoryName: string) {
	return `_${repositoryName.replace(/\W/ig, "")}`;
}

export const makeRepoNameIso = makeIso(escapeRepositoryName)
