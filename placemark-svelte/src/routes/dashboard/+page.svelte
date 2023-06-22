<script>
    import Header from "$lib/Header.svelte";
    import MainNavigator from '$lib/MainNavigator.svelte';
    import PlacemarkList from "$lib/PlacemarkList.svelte";
</script>

<div class="box is-vcentered content">
    <MainNavigator />
</div>



<div class="columns is-vcentered content">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Placemarks to date</h1>
        <PlacemarkList />
    </div>
</div>
