<script>
    import { goto } from "$app/navigation";
    import { placemarkService } from "../../../../services/placemark-service.js";
    import {onMount} from "svelte";

    export let data;


    onMount(async () => {
        await placemarkService.deletePlacemark(data)
        goto("/dashboard");
    });


</script>
