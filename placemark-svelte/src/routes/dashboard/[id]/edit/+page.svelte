<script>
    import MainNavigator from "$lib/MainNavigator.svelte";
    import { placemarkService } from "../../../../services/placemark-service.js";
    import { user } from "../../../../stores.js";
    import {goto} from "$app/navigation";
    // @ts-nocheck

    export let data;

    let name = "";
    let description = "";
    let longitude = "";
    let latitude = "";

    let CategoryList =["Food", "Entertainment", "Accommodation", "Transportation", "City", "Education", "Medical", "Sport", "Shopping", "Landscape-Feature", "River", "Waters", "Bridge", "Forest", "Parks", "Historic-sites", "Gas-station", "Company", "Other"]

    let selectedCategory = "";
    let message ="Edit Placemark";

    async function editPlacemark() {
            const placemark = {
                name: name,
                description: description,
                location: {
                    latitude: latitude,
                    longitude: longitude,
                },
                category: selectedCategory,
            }
            const success= await placemarkService.editPlacemark(placemark, data);
            if (!success) {
                message = "Adding not completed - some error occurred";
                return;
            }
            message = "You edited the Placemark";
        }




</script>

<div class="box is-centered content">
    <MainNavigator />
</div>


<form on:submit|preventDefault={editPlacemark}>

    <div class="field">
        <label for="name" class="label">Name</label>
        <input bind:value={data.placemark.name} id="name" class="input" type="text" placeholder="{data.placemark.name}" name="name">
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={data.placemark.description} class="input" id="description" name="{data.placemark.description}" type="text"/>
    </div>
    <div class="field">
        <label for="longitude" class="label">longitude</label>
        <input bind:value={data.placemark.location.longitude} id="longitude" class="input" type="number" min="-180" max="180" placeholder="Enter longitude" name="{data.placemark.location.longitude}" step="0.000001">
    </div>
    <div class="field">
        <label for="latitude" class="label">latitude</label>
        <input bind:value={data.placemark.location.latitude} id="latitude" class="input" type="number" min="-90" max="90" placeholder="Enter latitude" name="{data.placemark.location.latitude}" step="0.000001">
    </div>
    <div class="field">
        <label for="latitude" class="label">category</label>
        <div class="select">
            <select bind:value={selectedCategory}>
                {#each CategoryList as category}
                    <option>{category}</option>
                {/each}
            </select>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Edit Placemark</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
