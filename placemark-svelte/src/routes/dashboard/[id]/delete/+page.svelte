<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "../../../../services/placemark-service.ts";
    import {onMount} from "svelte";
    import type {DataForPlacemark} from "../../../../services/types";

    export let data: DataForPlacemark;


    onMount(async () => {
        await placemarkService.deletePlacemark(data.placemark._id)
        goto("/dashboard");
    });


</script>
