<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { placemarkService } from "../services/placemark-service.ts";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
