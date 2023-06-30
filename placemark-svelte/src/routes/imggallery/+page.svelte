<script lang="ts">
    import {onMount} from "svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import { placemarkService } from "../../services/placemark-service.ts";


    let images = [];
    onMount(async () => {
        images = await placemarkService.getallimages()
    });

</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>


<div class="box is-vcentered content">

    <h1 class="title is-1 has-text-centered">Image Gallery</h1>

    {#each images as img}
        <div class="card">
            <div class="card-image is-centered" >
                <figure >
                    <img src={img.secure_url} alt=""  width="600">
                </figure>
            </div>
        </div>
    {/each}
</div>
