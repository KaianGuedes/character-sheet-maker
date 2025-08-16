<script lang="ts">
    import { Sheet, Step } from '$lib/sheet'
    import { onMount, tick } from 'svelte';

    let { sheet }: { sheet: Sheet } = $props();

    let currentIndex: number = $state(0);
    let currentStep: Step = $derived(sheet.getStep(currentIndex));
    let currentTimeoutId: NodeJS.Timeout;
    let maxVisibleOptionIndex: number = $state(0);

    const isFirst = () => (currentIndex === 0);
    const isLast = () => (currentIndex === sheet.getSteps().length - 1);

    onMount(() => {
        revealOptions()
    })
    
    const next = () => {
        if (isLast()) return;
        clearTimeout(currentTimeoutId);
        currentIndex++;
        maxVisibleOptionIndex = 0;
        revealOptions()
    }

    const previous = () => {
        if (isFirst()) return;
        clearTimeout(currentTimeoutId);
        currentIndex--;
        maxVisibleOptionIndex = 0;
        revealOptions()
    }

    function revealOptions() {
        if ((maxVisibleOptionIndex == currentStep.options.length)) return;
        tick().then(() => currentTimeoutId = setTimeout(() => {
            maxVisibleOptionIndex++;
            revealOptions();
        }, (250 / currentStep.options.length)));
    }
</script>

<div class="step-window">
    <div class="content">
        <p class="label">{currentStep.label}</p>
        <div class="options">
            {#each currentStep.options as option, index (option.uuid)}
                <button
                        class="option"
                        style:opacity={index < maxVisibleOptionIndex ? "1" : "0"}
                >
                    {option.getText()}
                </button>
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
        .label {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        .options {
            .option {
                transition: opacity 1s ease;
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
        border: 0;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
        padding: 5px;
        color: white;
        cursor: pointer;

        &:disabled {
            color: rgba(217, 152, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.05);
        }
        &:hover {
            background-color: rgba(255, 255, 255, 0.25);
        }
        &:disabled:hover {
            background-color: rgba(255, 255, 255, 0.05);
            cursor: not-allowed;
        }
    }
</style>