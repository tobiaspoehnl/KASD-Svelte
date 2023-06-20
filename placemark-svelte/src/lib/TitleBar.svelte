<script>
    export let title = '';
    export let subTitle = '';
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
        <img src="/homer.png" width="60" alt="img" />
    </div>
    <div class="column">
        <div class="title is-5">{title}</div>
        <div class="subtitle is-5">{subTitle}</div>
    </div>
    <div class="column">
        <i class="fas fa-donate fa-3x" style="color:rgb(95, 96, 173)" />
        <div class="is-size-7">Donation-Svelte 0.1</div>
    </div>
</div>
