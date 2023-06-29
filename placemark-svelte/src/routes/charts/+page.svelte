<script>
    import {onMount} from "svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import { placemarkService } from "../../services/placemark-service.js";
    import {latestChartType, latestRoute} from "../../stores.js";
    import Chart from 'svelte-frappe-charts';
    import {goto} from "$app/navigation";

    let data = {
        labels: ["Food", "Entertainment", "Accommodation", "Transportation", "City", "Education", "Medical", "Sport", "Shopping", "Landscape-Feature", "River", "Waters", "Bridge", "Forest", "Parks", "Historic-sites", "Gas-station", "Company", "Other"],
        datasets: [
            {
                values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
        ]
    };
    let data2 = {
        labels: ['Users', 'Placemarks'],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    }

    onMount(async () => {
        const dataset = await placemarkService.getdataset();
        data2.datasets[0].values[0] = dataset.userlength;
        data2.datasets[0].values[1] = dataset.placemarklength;
        data.datasets[0].values[0] = dataset.foodlength;
        data.datasets[0].values[1] = dataset.entertainmentlength;
        data.datasets[0].values[2] = dataset.accommodationlength;
        data.datasets[0].values[3] = dataset.transportationlength;
        data.datasets[0].values[4] = dataset.citylength;
        data.datasets[0].values[5] = dataset.educationlength;
        data.datasets[0].values[6] = dataset.medicallength;
        data.datasets[0].values[7] = dataset.sportlength;
        data.datasets[0].values[8] = dataset.shoppinglength;
        data.datasets[0].values[9] = dataset.landscapefeaturelength;
        data.datasets[0].values[10] = dataset.riverlength;
        data.datasets[0].values[11] = dataset.waterslength;
        data.datasets[0].values[12] = dataset.bridgelength;
        data.datasets[0].values[13] = dataset.forestlength;
        data.datasets[0].values[14] = dataset.parkslength;
        data.datasets[0].values[15] = dataset.historicsiteslength;
        data.datasets[0].values[16] = dataset.gasstationlength;
        data.datasets[0].values[17] = dataset.companylength;
        data.datasets[0].values[18] = dataset.otherslength;
    });

    export let charttype;

    let charttypes = ["bar", "percentage", "line", "pie"];
    let selectedchart = "";


    function reload() {
        if(selectedchart != ""){
            latestChartType.update(() => selectedchart);
            const route = "/charts";
            latestRoute.update(() => route);
            goto("/reload");
        }
    }

    latestChartType.subscribe((value) => {
        charttype = value;
    });


</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>

<h1 class="title is-1 has-text-centered">Charts</h1>


<form  on:submit|preventDefault={reload}>
    <div class="columns">
        <div class="column has-text-centered">
            <label for="charttype" class="title is-5">Charttype:</label>
            <div class="select">
                <select bind:value={selectedchart} id="charttype">
                    {#each charttypes as chart}
                        <option>{chart}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <div class="control">
                    <button class="button is-link is-light">Submit</button>
                </div>
            </div>
        </div>
    </div>
</form>

<h1 class="title is-4">Placemarks by category Total:</h1>
<Chart type={charttype} data={data} />
<h2 class="title is-4">User and placemark total:</h2>
<Chart type={charttype} data={data2}/>