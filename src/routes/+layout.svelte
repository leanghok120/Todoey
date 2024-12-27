<script lang="ts">
	import ToggleTheme from '$lib/components/ui/ToggleTheme.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<svelte:head>
	<title>Todoey</title>
</svelte:head>

<ToggleTheme />
<ModeWatcher />

<main class="flex min-h-screen flex-col items-center justify-center">
	<slot />
</main>
