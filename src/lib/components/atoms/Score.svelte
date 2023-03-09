<script lang="ts">
	export let score: number;
	export let grade: "bad" | "mid" | "good";
</script>

<em class={grade}>{score}</em>

<style>
	em {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: var(--weight-bold);
		color: white;
		padding: var(--grid-4s) var(--grid-1x);
		border-radius: var(--slightly-rounded);
	}

	.bad {
		background: var(--score-bad-bg);
	}

	.mid {
		background: var(--score-mid-bg);
	}

	.good {
		background: var(--score-good-bg);
	}
</style>
