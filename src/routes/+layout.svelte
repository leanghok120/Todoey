<script lang="ts">
	import ToggleTheme from '$lib/components/ui/ToggleTheme.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<ToggleTheme />
<ModeWatcher />
<slot />
