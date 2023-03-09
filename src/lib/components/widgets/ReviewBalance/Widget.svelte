<script lang="ts">
	import Spinner from '$lib/components/atoms/Spinner.svelte';
	import Widget from '$lib/components/atoms/Widget.svelte';
	import Score from '$lib/components/atoms/Score.svelte';
	import { makeUserNameIso } from '$lib/gql/userNameIso';
	import { queryWithUtilization } from '$lib/queryWithUtilization';
	import { type Option, some, none } from 'fp-ts/lib/Option';

	import { makeQuery, type AuthoredKey, type ReviewedKey } from './makeQuery';
	import RunOption from '$lib/components/atoms/RunOption.svelte';

	export let title: string = "Custom Search";
	export let org: string;
	export let users: string[];
	export let sinceDays: number;

	function computeGrade(score: number) {
		if (score < 1) {
			return "bad";
		} else if (score >= 1 && score < 2) {
			return "mid";
		} else {
			return "good";
		}
	}

	const userIso = makeUserNameIso(users);
	const query = makeQuery(userIso, org, users, sinceDays);

	queryWithUtilization(query);

	let reviewBalances: Option<[string, number, number, number][]>;

	$: {
		let newReviewBalances: typeof reviewBalances;

		if ($query.data) {
			const tempBalances: [string, number, number, number][] = [];

			for (const user of users) {
				const authoredKey: AuthoredKey = `${userIso.safeName(user)}_authored`;
				const reviewedKey: ReviewedKey = `${userIso.safeName(user)}_reviewed`;

				const authored = $query.data[authoredKey].issueCount;
				const reviewed = $query.data[reviewedKey].issueCount;

				tempBalances.push([user, authored, reviewed, reviewed / authored])
			}

			newReviewBalances = some(tempBalances);
		} else {
			newReviewBalances = none;
		}

		reviewBalances = newReviewBalances;
	}

	$: console.log(reviewBalances)
</script>

<Widget>
	<h2 slot="header"><b>{title}</b></h2>
	<div class="meta" slot="meta">
		<span>Last <b>{sinceDays}</b> Day(s)</span>
		<Spinner isLoading={false} />
	</div>
	<RunOption option={reviewBalances}>
		<svelte:fragment slot="none"></svelte:fragment>
		<svelte:fragment slot="some" let:some={balances}>
			<table>
				<thead>
					<tr>
						<th>User</th>
						<th>PRs</th>
						<th>Reviews</th>
						<th>Ratio</th>
					</tr>
				</thead>
				<tbody>
					<!-- TODO: Need to upgrade Svelte to latest version to get generic component support -->
					{#each balances as balance}
						<tr>
							<td>{balance[0]}</td>
							<td>{balance[1]}</td>
							<td>{balance[2]}</td>
							<td><Score score={balance[3].toFixed(2)} grade={computeGrade(balance[3])} /></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</svelte:fragment>
	</RunOption>
</Widget>

<style>
	/* TODO: This container style could probably be moved to the Widget styles since this is duplicated between them */
	.meta {
		display: flex;
		align-items: center;
		gap: var(--global-gutter);
	}

	table {
		border-collapse: collapse;
	}

	th {
		font-weight: var(--weight-bold);
		font-size: 0.9rem;
		color: var(--font-color-light);
	}

	tr {
		border-bottom: 1px solid var(--global-border-color);
	}

	thead > tr {
		border-bottom-width: 2px;
	}

	tbody > tr:last-child {
		border-bottom: none;
	}

	td,
	th {
		padding: var(--grid-1x);
		text-align: right;
	}

	:is(td, th):first-child {
		text-align: left;
		font-weight: var(--weight-bold);
	}
</style>
