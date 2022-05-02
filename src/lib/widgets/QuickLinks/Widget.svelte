<script lang="ts">
	import Widget from '$lib/components/atoms/Widget.svelte';
</script>

<Widget>
	<h2 slot="header"><b>Quick Links</b></h2>
	<ul class="links">
		<li>
			<a class="link-card">
				<div class="avatar" style="background: #5f27cd;">ux</div>
				<h3>ui-ux</h3>
				<em>rentpath</em>
			</a>
		</li>
		<li>
			<a class="link-card">
				<div class="avatar" style="background: #10ac84;">ag</div>
				<h3>ag.js</h3>
				<em>rentpath</em>
			</a>
		</li>
		<li>
			<a class="link-card">
				<div class="avatar" style="background: #2e86de;">re</div>
				<h3>rent-js</h3>
				<em>rentpath</em>
			</a>
		</li>
		<li>
			<a class="link-card">
				<div class="avatar" style="background: #f368e0;">rn</div>
				<h3>rent-next</h3>
				<em>rentpath</em>
			</a>
		</li>
	</ul>
</Widget>

<style>
	ul {
		flex: 1;
		list-style: none;
		padding: 8px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		grid-auto-rows: min-content;
	}

	ul li {
		margin-bottom: 8px;
	}

	.link-card {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-areas:
			"i t"
			"i o";
		box-shadow: var(--border-color) 1px 1px 0px;
		padding: 6px;
		border-radius: 4px;
	}

	.avatar {
		grid-area: i;
		width: 48px;
		height: 48px;
		color: #FFF;
		border-radius: 4px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		font-size: 2rem;
		text-transform: lowercase;
		font-weight: var(--weight-bold);
		line-height: 2rem;
    	padding-right: 4px;
		margin-right: 8px;
	}

	h3 {
		font-weight: var(--weight-bold);
		grid-area: t;
		align-self: end;
	}

	em {
		color: var(--font-color-light);
		font-weight: var(--weight-normal);
		grid-area: o;
		align-self: start;
	}
</style>
