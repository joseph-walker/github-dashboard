<script lang="ts">
	type Role
		= "body"
		| "bold"
		| "heading";

	export let role: Role = "body";

	function getTagForRole(r: Role) {
		switch (r) {
			case "body": return "p";
			case "bold": return "b";
			case "heading": return "h1";
			default: {
				const unknownRole: never = r;
				throw new Error(`Unkown role ${unknownRole}`);
			}
		}
	}
</script>

<svelte:element this={getTagForRole(role)}>
	<slot></slot>
</svelte:element>

<style>
	* {
		color: var(--color, --font-color);
	}

	p {
		font-weight: var(--weight-normal);
	}

	b {
		font-weight: var(--weight-bold);
	}
</style>
