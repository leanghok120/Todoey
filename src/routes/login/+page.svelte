<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { form }: { form: ActionData } = $props();
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form action="?/login" method="POST" class="grid gap-4" use:enhance>
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" name="username" type="text" placeholder="johndoe120" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" name="password" type="password" required />
			</div>
			<Button class="w-full" type="submit">Login</Button>
			{#if form?.message}
				<p class="text-red-500">{form?.message}</p>
			{/if}
		</form>
	</Card.Content>
	<Card.Footer>
		<p class="w-full text-center text-sm">
			Don't have an account? <a href="/signup" class="underline">Sign up</a>
		</p>
	</Card.Footer>
</Card.Root>
