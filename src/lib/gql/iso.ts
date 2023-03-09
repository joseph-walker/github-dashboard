export type Iso = {
	safeName: (unsafeName: string) => string;
	unsafeName: (safeName: string) => string;
}

export const makeIso = (escape: (s: string) => string) => (items: string[]): Iso => {
	const isoMapUnsafeToSafe = Object.fromEntries(items.map(r => [r, escape(r)]));
	const isoMapSafeToUnsafe = Object.fromEntries(items.map(r => [escape(r), r]));

	return {
		safeName: function safeName(unsafeName: string) {
			return isoMapUnsafeToSafe[unsafeName];
		},
		unsafeName: function unsafeName(safename: string) {
			return isoMapSafeToUnsafe[safename];
		}
	};
}
