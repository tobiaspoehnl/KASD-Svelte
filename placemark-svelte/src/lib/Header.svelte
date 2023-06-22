<script>
    import TitleBar from './TitleBar.svelte';
</script>

<div class="box is-centered">
    <div class=" is-two-thirds is-centered">
        <TitleBar title={'Placemark'} subTitle={'Sign up or Log in'} />
    </div>
    <div class="column">
        <slot />
    </div>
</div>
