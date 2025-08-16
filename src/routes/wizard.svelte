<script lang="ts">
    import { Sheet, Step } from '$lib/sheet'

    let { sheet }: { sheet: Sheet } = $props();

    let currentIndex: number = $state(0);
    let currentStep: Step = $derived(sheet.getStep(currentIndex));

    const isFirst = () => {
        return (currentIndex === 0);
    }

    const isLast = () => {
        return (currentIndex === sheet.getSteps().length - 1);
    }

    const next = () => {
        if (isLast()) return;
        currentIndex++;
    }

    const previous = () => {
        if (isFirst()) return;
        currentIndex--;
    }
</script>

<div class="step-window">
    <div class="content">
        <p class="label">{currentStep.label}</p>
        <div class="options">
            {#each currentStep.options as option(option.uuid)}
                <button class="option">{option.getText()}</button>
            {/each}
        </div>
    </div>
    <div class="buttons">
        <button disabled={isFirst()} onclick={previous}>
            Previous
        </button>
        <button disabled={isLast()} onclick={next}>
            Next
        </button>
    </div>
</div>

<style lang="scss">
    .step-window {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        gap: 5px;
    }
    .content {
        display: flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
        min-height: 25%;
        max-width: 80%;
        background-color: darksalmon;
        .label {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        .options {
            .option {
                flex: none;
            }
            &::after {
                content: "";
                flex: auto;
            }
            margin: 0 20px 20px 20px;
            gap: 5px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            flex-wrap: wrap;
        }
    }
    .buttons {
        display: inline-flex;
        justify-content: center;
        gap: 5px;
        button {
            min-width: 100%;
        }
    }

    button {
        &:disabled:hover {
            cursor: not-allowed;
        }
        cursor: pointer;
    }
</style>