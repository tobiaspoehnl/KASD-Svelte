<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from "$lib/MainNavigator.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemark-service.js";

    const apiKey= import.meta.env.VITE_apikeyopenweather;

    export let data;


    var conditions;

    onMount(async () => {
        let placemark = await placemarkService.getPlacemark(data.placemark._id);
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





