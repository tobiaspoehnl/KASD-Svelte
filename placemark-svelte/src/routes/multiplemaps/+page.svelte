<script>
    import { beforeUpdate } from "svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import { placemarkService } from "../../services/placemark-service.js";

    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>

<h1 class="title is-1 has-text-centered">Multiple Maps</h1>

<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map" layer=""/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map2" layer="Satellite"/>
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map3" layer="OPNVKarte"/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map4" layer="Esri_WorldStreetMap"/>
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map5" layer="Esri_WorldStreetMap"/>
        </div>
    </div>
    <div class="column">
        <div class="box">
            <PlacemarkMap mapname="placemark-map6" layer="Temperature"/>
        </div>
    </div>
</div>

