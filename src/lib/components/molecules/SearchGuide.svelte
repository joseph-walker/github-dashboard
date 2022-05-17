<script lang="ts">
	import Widget from "$lib/components/atoms/Widget.svelte";
</script>

<Widget>
	<h2 slot="header"><b>Search Guide</b></h2>
	<div class="guide">
		<h3>Search in Text</h3>
		<ul>
			<li>in:title</li>
			<li>in:body</li>
			<li>in:comments</li>
		</ul>

		<h3>Search by Owner</h3>
		<ul>
			<li>user:<span class="template">username</span></li>
			<li>org:<span class="template">username</span></li>
			<li>repo:<span class="template">username/repository</span></li>
		</ul>

		<h3>Search by open state</h3>
		<ul>
			<li>is:open</li>
			<li>is:closed</li>
		</ul>

		<h3>Filter by visibility</h3>
		<ul>
			<li>is:public</li>
			<li>is:private</li>
		</ul>

		<h3>Search by author</h3>
		<ul>
			<li>author:<span class="template">name</span></li>
			<li>author:<span class="template">app/name</span></li>
		</ul>

		<h3>Search by assignee</h3>
		<ul>
			<li>assignee:<span class="template">name</span></li>
		</ul>

		<h3>Search by mention</h3>
		<ul>
			<li>mentions:<span class="template">name</span></li>
		</ul>

		<h3>Search by team mention</h3>
		<ul>
			<li>team:<span class="template">org/team</span></li>
		</ul>

		<h3>Search by commenter</h3>
		<ul>
			<li>commenter:<span class="template">name</span></li>
		</ul>

		<h3>Search by involved users</h3>
		<ul>
			<li>involves:<span class="template">name</span></li>
		</ul>

		<h3>Search for linked issues</h3>
		<ul>
			<li>linked:pr</li>
			<li>linked:issue</li>
		</ul>

		<h3>Search by label</h3>
		<ul>
			<li>label:<span class="template">label</span></li>
		</ul>

		<h3>Search by commit status</h3>
		<ul>
			<li>status:pending</li>
			<li>status:success</li>
			<li>status:failure</li>
		</ul>

		<h3>Search by SHA</h3>
		<ul>
			<li><span class="template">SHA</span></li>
		</ul>

		<h3>Search for drafts</h3>
		<ul>
			<li>draft:true</li>
			<li>draft:false</li>
		</ul>

		<h3>Search by review status</h3>
		<ul>
			<li>review:none</li>
			<li>review:required</li>
			<li>review:approved</li>
			<li>review:changes_requested</li>
			<li>reviewed-by:<span class="template">name</span></li>
			<li>review-requested:<span class="template">name</span></li>
			<li>user-review-requested:@me</li>
			<li>team-review-requested:<span class="template">org/team</span></li>
		</ul>

		<h3>Search by merge status</h3>
		<ul>
			<li>is:merged</li>
			<li>is:unmerged</li>
		</ul>

		<h3>Search by missing metadata</h3>
		<ul>
			<li>no:label</li>
			<li>no:milestone</li>
			<li>no:assignee</li>
			<li>no:project</li>
		</ul>
	</div>
</Widget>

<style>
	h3 {
		font-weight: bold;
		font-size: 0.8rem;
		margin-bottom: var(--grid-2s);
		border-bottom: 1px dashed var(--global-border-color);
		padding-bottom: var(--grid-2s);
	}

	ul {
		margin-left: 8px;
		margin-bottom: 8px;
	}

	ul:last-of-type {
		margin-bottom: 0;
	}

	li {
		font-weight: normal;
	}

	.guide {
		margin: calc(var(--global-gutter) * -1);
		padding: var(--global-gutter);
		max-height: 600px;
		overflow-y: scroll;
	}

	.template {
		font-style: italic;
		font-weight: bold;
	}
</style>
