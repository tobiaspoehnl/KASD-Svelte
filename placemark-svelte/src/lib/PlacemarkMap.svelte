<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map.js";
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service.ts";
    import { latestPlacemark } from "../stores.ts";

    const mapConfig = {
        location: { lat: 51.163361, lng: 10.447683 },
        zoom: 5,
        minZoom: 1
    };
    let map;
    export let mapname="";
    export let layer= "";

    onMount(async () => {
        map = new LeafletMap(mapname, mapConfig, layer);
        map.showZoomControl();
        map.addLayerGroup("Placemarks");
        map.showLayerControl();
        const placemarks = await placemarkService.getPlacemarks();
        placemarks.forEach((placemark) => {
            addPlacemarkMarker(map, placemark);
        });
    });

    function addPlacemarkMarker(map, placemark) {
        const placemarkStr = `${placemark.name}`;
        map.addMarker({ lat: placemark.location.latitude, lng: placemark.location.longitude }, placemarkStr, "Placemarks", placemark._id);
    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            addPlacemarkMarker(map, placemark);
        }
    });
</script>

<div class="box" id={mapname} style="height:75vh" />
