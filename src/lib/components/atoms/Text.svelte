<script lang="ts">
	type Role
		= "body"
		| "emphasis"
		| "heading";

	export let role: Role = "body";
	export let bold: boolean = false;

	function getTagForRole(r: Role) {
		switch (r) {
			case "body": return "p";
			case "emphasis": return "b";
			case "heading": return "h1";
			default: {
				const unknownRole: never = r;
				throw new Error(`Unkown role ${unknownRole}`);
			}
		}
	}
</script>

<svelte:element class:bold this={getTagForRole(role)}>
	<slot></slot>
</svelte:element>

<style>
	* {
		color: var(--color, --font-color);
		font-weight: var(--weight-normal);
	}

	.bold {
		font-weight: var(--weight-bold);
	}
</style>
