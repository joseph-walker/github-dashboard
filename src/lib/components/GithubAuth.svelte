<script lang="ts">
	import { CLIENT_ID } from "$lib/envShared";
</script>

<div class="container">
	<a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user,repo`}>Log In with Github</a>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	a {
		cursor: pointer;
		font-size: 1.2rem;
		color: #FFF;
		padding: 8px 16px;
		background: #546de5;
		border-radius: 8px;
	}
</style>
