<script>
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {latestRoute} from "../../stores.js";

    let route;
    latestRoute.subscribe((value) => {
        route = value;
    });

    onMount(async () => {
        await goto(route);
    });
</script>