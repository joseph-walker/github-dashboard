export type RepoNameIso = {
	safeName: (unsafeName: string) => string;
	unsafeName: (safeName: string) => string;
}

export function escapeRepositoryName(repositoryName: string) {
	return repositoryName.replace(/\W/ig, "");
}

export function makeRepoNameIso(repos: string[]): RepoNameIso {
	const isoRepoNameMapUnsafeToSafe = Object.fromEntries(repos.map(r => [r, escapeRepositoryName(r)]));
	const isoRepoNameMapSafeToUnsafe = Object.fromEntries(repos.map(r => [escapeRepositoryName(r), r]));

	return {
		safeName: function repoNameSafe(unsafeName: string) {
			return isoRepoNameMapUnsafeToSafe[unsafeName];
		},
		unsafeName: function repoNameUnsafe(safename: string) {
			return isoRepoNameMapSafeToUnsafe[safename];
		}
	};
}
