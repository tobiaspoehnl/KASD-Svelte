<script>
    import Header from '$lib/Header.svelte';
    import DonationList from '$lib/DonationList.svelte';
</script>

<Header />

<div class="columns">
    <div class="column has-text-centered">
        <img alt="Homer" src="/homer4.jpeg" width="300" />
    </div>
    <div class="column box has-text-centered">
        <h1 class="title is-4">Donations to date</h1>
        <DonationList />
    </div>
</div>
