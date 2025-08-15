<script lang="ts">
    import Step from './step.svelte'
</script>

<div>
    <Step></Step>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
        height: 100vh;
        width: 100vw;
    }

    div {
        height: 100%;
        width: 100%;
        background-color: cadetblue;
    }
</style>