<script lang="ts">
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service.ts";
    import type {ReturnedPlacemark} from "../services/types";

    let placemarkList: Array<ReturnedPlacemark>= [];
    onMount(async () => {
        placemarkList = await placemarkService.getPlacemarks();
    });
</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Category</th>
    <th>Location</th>
    <th>Description</th>
    </thead>
    <tbody>
    {#each placemarkList as placemark}
        <tr>
            <td>
                {placemark.name}
            </td>
            <td>
                {placemark.category}
            </td>
            <td>
                {placemark.location.latitude}, {placemark.location.longitude}
            </td>
            <td>
                {placemark.description}
            </td>
            <td>
                <a href="/dashboard/{placemark._id}" class="button">
                    <i class="fas fa-folder-open"></i>
                </a>
            </td>
        </tr>
    {/each}
    </tbody>
</table>

