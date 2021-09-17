<script lang="ts">
	export let pr;
</script>

<div class="pr-card">
	<h3>
		<a href={pr.url} target="_blank" rel="noopener noreferrer">{pr.title}</a>
		<span class="repo-name">{pr.repository.name}</span>
	</h3>
	<p class="summary-line changes">
		<img class="file icon" src="/document-outline.svg" alt="files" />
		<span><b>{pr.changedFiles}</b>&nbsp;Changed File(s)</span>
		<span class="additions">+{pr.additions}</span>
		<span class="deletions">-{pr.deletions}</span>
	</p>
	<section class="comments">
		<p class="summary-line">
			<img class="comments icon" src="/chatbubble-outline.svg" alt="files" />
			<b>{pr.comments.totalCount}</b>&nbsp;Comment(s)
			{#if pr.comments.totalCount > 0}
				<button class="inline-action">Show</button>
			{/if}
		</p>
	</section>
	<section class="reviews">
		<p class="summary-line">
			<img class="reviews icon" src="/chatbubbles-outline.svg" alt="files" />
			<b>{pr.latestReviews.totalCount}</b>&nbsp;Review(s)
			{#if pr.latestReviews.totalCount > 0}
				<button class="inline-action">Show</button>
			{/if}
		</p>
	</section>
</div>

<style>
	.pr-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		box-shadow: var(--border-color) 1px 1px 0px;
		padding: 6px;
		border-radius: 4px;
	}

	h3 {
		font-weight: var(--weight-bold);
	}

	h3 .repo-name {
		margin-left: 8px;
		color: var(--font-color-light);
		font-weight: var(--weight-normal);
	}

	a:visited {
		color: inherit;
	}

	.summary-line {
		display: flex;
		align-items: center;
	}

	.icon {
		height: 1.2rem;
		margin-right: 4px;
		/* Adjust icon placement for spacing issues */
		margin-bottom: 2px;
		margin-left: -2px;
	}

	.inline-action {
		font-size: 0.9rem;
		color: var(--font-color-light);
		cursor: pointer;
		margin-left: 8px;
	}

	.additions {
		color: #10ac84;
		font-weight: var(--weight-bold);
		margin-left: 8px;
	}

	.deletions {
		margin-left: 4px;
		color: #ee5253;
		font-weight: var(--weight-bold);
	}
</style>
