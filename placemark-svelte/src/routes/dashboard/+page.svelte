<script lang="ts">
    import { beforeUpdate } from "svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkList from "$lib/PlacemarkList.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { placemarkService } from "../../services/placemark-service.ts";


    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>

<h1 class="title is-1 has-text-centered">Dashboard</h1>

<PlacemarkMap mapname="placemark-map6" layer=""/>
<div class="box is-vcentered">
    <div class="columns is-vcentered content">
        <div class="column box has-text-centered">
            <h1 class="title is-4">Placemarks to date</h1>
            <PlacemarkList />
        </div>
    </div>
</div>