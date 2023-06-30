<script lang="ts">
    import MainNavigator from "$lib/MainNavigator.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemark-service.ts";
    import {goto} from "$app/navigation";
    import type {DataForPlacemark, Placemark} from "../../../services/types.ts";

    const apiKey= import.meta.env.VITE_apikeyopenweather;

    export let data: DataForPlacemark ;


    let conditions;

    let placemark: Placemark


    onMount(async () => {
        placemark = await placemarkService.getPlacemark(data.placemark._id);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${placemark.location.latitude}&lon=${placemark.location.longitude}&units=metric&appid=${apiKey}`;
        await fetch(requestUrl, {
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                conditions = data;
            });
    });

    let fileName = "";
    let files;

    async function uploadImages() {
        await placemarkService.uploadImage(data.placemark._id, files);
        await goto("/dashboard");
    }

    async function deleteImages() {
        const response = await placemarkService.deleteImages(data.placemark._id);
        if (response) {
            await goto("/dashboard")
        }
    }

    async function addImages() {
        if (files.length > 0) {
            fileName = "";
            for (const element of files) {
                fileName += element.name + ", ";
            }
        }
    }
</script>


<div class="box is-centered content">
    <MainNavigator />
</div>

<section class="section columns is-vcentered">
    <div class="column">
        <div class="name title">
            {data.placemark.name}
        </div>
        <div>
            <div>
                <p class="title is-5">Description: </p>
                <p class="subtitle is-6">{data.placemark.description}</p>
            </div>
            <div>
                <p class="title is-5">Latitude: </p>
                <p class="subtitle is-6">{data.placemark.location.latitude}</p>
            </div>
            <div>
                <p class="title is-5">Longitude: </p>
                <p class="subtitle is-6">{data.placemark.location.longitude}</p>
            </div>
            <div>
                <p class="title is-5">Category: </p>
                <p class="subtitle is-6">{data.placemark.category}</p>
            </div>
            <div>
                <p class="title is-5">Weather: </p>
                <p class="subtitle is-6">{conditions?.weather[0].main}</p>
            </div>
            <div>
                <p class="title is-5">Temperature: </p>
                <p class="subtitle is-6">{conditions?.main?.temp} °C</p>
            </div>
        </div>
        <div class="field">
            <a href="/dashboard/{data.placemark._id}/edit" class="button is-info">
                <span>Edit</span>
            </a>
        </div>
        <div class="field">
            <a href="/dashboard/{data.placemark._id}/delete" class="button is-info">
                <span>Delete</span>
            </a>
        </div>
        <div class="box has-text-centered">
            <form on:submit|preventDefault={uploadImages} enctype="multipart/form-data">
                <div id="file-select" class="file has-name is-fullwidth">
                    <label class="file-label">
                        <input bind:files on:change={addImages} class="file-input"
                               name="imagefile" type="file" accept="image/png, image/jpeg">
                        <span class="file-cta">
                        <span class="file-icon">
                              <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                    </span>
                        <span class="file-name">{fileName}</span>
                    </label>
                    <button type="submit" class="button is-info">Upload</button>
                </div>
            </form>
        </div>
        <p class="title is-5">Delete images</p>
        <form on:submit|preventDefault={deleteImages}>
            <div class="card-footer">
                <button type="submit" class="button is-danger">
                <span class="icon">
                    <i class="fas fa-trash"></i>
                </span>
                </button>
            </div>
        </form>
    </div>
    <div class="column">
        {#each data.placemark.image as image}
            <div class="card">
                <div class="card-image">
                    <figure class="image is-256x256">
                        <img src={image} alt="">
                    </figure>
                </div>
            </div>
        {/each}
    </div>

</section>





