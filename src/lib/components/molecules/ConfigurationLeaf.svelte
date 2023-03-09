<script lang="ts">
	export let selected: boolean = false;
	export let title: string;
	export let leafType: string;
</script>

<div
	class:selected
	class="config-leaf"
	on:click>
		<b>{title}</b>
		<div class="meta"><slot></slot></div>
		<super class={`widget ${leafType}`}>{leafType}</super>
</div>

<style>
	.config-leaf {
		padding: var(--global-gutter);
    	border-radius: var(--slightly-rounded);
		cursor: pointer;
		transition: 0.1s ease-out box-shadow;
	}

	.config-leaf:hover {
		box-shadow: var(--green) 0px 0px 0px 1px;
	}

	.config-leaf.selected {
		box-shadow: var(--green) 0px 0px 0px 1px, inset var(--green) 0px 0px 0px 2px;
	}

	.config-leaf b {
		display: block;
		margin-bottom: 2px;
	}

	.meta {
		font-size: 0.8rem;
	}

	super {
		font-size: 0.7rem;
		position: absolute;
		top: var(--grid-1x);
		right: var(--grid-1x);
		padding: 2px 8px;
		border-radius: var(--slightly-rounded);
	}

	super.Root {
		background: var(--light-slate);
		color: var(--white);
	}

	super.Tab {
		background: var(--blue);
		color: var(--white);
	}

	super.__PRSearchWidget {
		background: var(--green);
		color: var(--white);
	}

	super.__ReviewBalanceWidget {
		background: var(--indigo);
		color: var(--white);
	}
</style>
