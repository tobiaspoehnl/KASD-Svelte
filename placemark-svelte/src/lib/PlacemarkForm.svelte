<script>
    import { placemarkService } from "../services/placemark-service.js";
    import { user } from "../stores.js";
    // @ts-nocheck

    let name = "";
    let description = "";
    let longitude = "";
    let latitude = "";

    let CategoryList =["Food", "Entertainment", "Accommodation", "Transportation", "City", "Education", "Medical", "Sport", "Shopping", "Landscape-Feature", "River", "Waters", "Bridge", "Forest", "Parks", "Historic-sites", "Gas-station", "Company", "Other"]

    let selectedCategory = "";
    let message ="Add Placemark";


    async function addPlacemark() {
        console.log(name)
        console.log(longitude)
        console.log(latitude)
        console.log(selectedCategory)
        if (name  && longitude && latitude && selectedCategory) {
            const placemark = {
                name: name,
                description: description,
                location: {
                    latitude: latitude,
                    longitude: longitude,
                },
                category: selectedCategory,
            }
            const success= await placemarkService.addPlacemark(placemark, $user.id);
            if (!success) {
                message = "Adding not completed - some error occurred";
                return;
            }
            message = "You added a Placemark";
        } else {
            message = "Please select name, location and category";
        }
    }
</script>

<form on:submit|preventDefault={addPlacemark}>

    <div class="field">
        <label for="name" class="label">Name</label>
        <input bind:value={name} id="name" class="input" type="text" placeholder="Enter name" name="name">
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={description} class="input" id="description" name="description" type="text" />
    </div>
    <div class="field">
        <label for="longitude" class="label">longitude</label>
        <input bind:value={longitude} id="longitude" class="input" type="number" placeholder="Enter longitude" name="longitude" step="0.000001">
    </div>
    <div class="field">
        <label for="latitude" class="label">latitude</label>
        <input bind:value={latitude} id="latitude" class="input" type="number" placeholder="Enter latitude" name="latitude" step="0.000001">
    </div>
    <div class="field">
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
            <button class="button is-link is-light">Donate</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>
