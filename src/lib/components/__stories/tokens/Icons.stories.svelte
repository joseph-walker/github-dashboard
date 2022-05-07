<script>
	import { Meta, Story } from "@storybook/addon-svelte-csf";

	import WidgetBackgroundDecorator from "$lib/components/__storybook/WidgetBackgroundDecorator.svelte";

	// @ts-ignore
	const iconTokens = ICONS_FROM_WEBPACK_INTROSPECTION;
</script>

<Meta title="Tokens / Icons" />

<Story name="Icons">
	<WidgetBackgroundDecorator>
		<section>
			<h1>Icons</h1>
			<p>These are used as the src attribute of image tags</p>
			<ul class="icons">
				{#each iconTokens as icon}
					<li>
						<img src={`/icons/${icon}`} alt="An Icon" />
						<em class="smaller">{icon}</em>
					</li>
				{/each}
			</ul>
		</section>
	</WidgetBackgroundDecorator>
</Story>

<style>
	ul {
		list-style: none;
		margin-top: 16px;
	}

	h1 {
		font-size: 1.6rem;
		font-weight: bold;
	}

	em {
		color: #666;
		font-weight: bold;
	}

	em.smaller {
		font-size: 0.8rem;
	}

	.icons {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 16px;
	}

	.icons li {
		display: flex;
		align-items: center;
	}

	.icons img {
		width: 24px;
		height: 24px;
		margin-right: 6px;
	}
</style>
