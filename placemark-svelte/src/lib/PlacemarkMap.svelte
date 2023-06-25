<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map.js";
    import { onMount } from "svelte";
    import { placemarkService } from "../services/placemark-service.js";
    import { latestPlacemark } from "../stores";

    const mapConfig = {
        location: { lat: 51.163361, lng: 10.447683 },
        zoom: 5,
        minZoom: 1
    };
    let map;

    onMount(async () => {
        map = new LeafletMap("donation-map", mapConfig);
        map.showZoomControl();
        map.showLayerControl();
        const placemarks = await placemarkService.getPlacemarks();
        placemarks.forEach((placemark) => {
            addPlacemarkMarker(map, placemark);
        });
    });

    function addPlacemarkMarker(map, placemark) {
        const placemarkStr = `${placemark.name} :${placemark.category}`;
        map.addMarker({ lat: placemark.location.latitude, lng: placemark.location.longitude }, placemarkStr);
    }

    latestPlacemark.subscribe((placemark) => {
        if (placemark && map) {
            addPlacemarkMarker(map, placemark);
        }
    });
</script>

<div class="box" id="donation-map" style="height:75vh" />
