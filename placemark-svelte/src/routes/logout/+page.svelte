<script lang="ts">
    import { goto } from "$app/navigation";
    import { placemarkService } from "../../services/placemark-service.ts";

    placemarkService.logout();
    goto("/");
</script>
