<script>
    import {beforeUpdate, onMount} from "svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import { placemarkService } from "../../services/placemark-service.js";
    import Chart from 'svelte-frappe-charts';

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


    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>

<h1 class="title is-1 has-text-centered">Charts</h1>

<h1 class="title is-4">Placemarks by category Total:</h1>
<Chart data={data} type="line" />
<h1 class="title is-4">User and placemark total:</h1>
<Chart data={data2} type="line"/>