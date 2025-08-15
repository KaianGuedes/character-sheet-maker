<script lang="ts">
    let next: HTMLButtonElement | undefined;
    let previous: HTMLButtonElement | undefined;
</script>

<div class="step-window">
    <div class="content">

    </div>
    <div class="buttons">
        <button bind:this={previous}>
            Previous
        </button>
        <button bind:this={next}>
            Next
        </button>
    </div>
</div>

<style lang="scss">
    .step-window {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    .content {
    }
    .buttons {
        display: inline-flex;
        justify-content: center;
        gap: 5px;
        button {
            min-width: 100%;
        }
    }
</style>