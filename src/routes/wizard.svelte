<script lang="ts">
    import { Sheet, Step } from '$lib/sheet'
    import { onMount, tick } from 'svelte';
    import { blur } from 'svelte/transition';

    let { sheet }: { sheet: Sheet } = $props();

    // Step & Option stuff
        // Step
    let currentIndex: number = $state(0);
    let currentStep: Step = $derived(sheet.getStep(currentIndex));

    let buttonOpacityReady: boolean = $state(false);

        // Option
    let selectedOption: number | undefined = $state(undefined);
    $effect(() => {
        if (selectedOption === undefined) return;
        currentStep.setSelectedOption(selectedOption);
    })

    // Reveal options stuff
    let currentTimeoutId: NodeJS.Timeout;
    let maxVisibleOptionIndex: number = $state(0);

    const isFirst = () => (currentIndex === 0);
    const isLast = () => (currentIndex === sheet.getSteps().length - 1);

    const next = () => {
        if (isLast()) return;
        clearTimeout(currentTimeoutId);
        buttonOpacityReady = false;
        currentIndex++;
        maxVisibleOptionIndex = 0;
        revealOptions()
        selectedOption = currentStep.getSelectedOption();
        setTimeout(() => buttonOpacityReady = true, 850);
    }

    const previous = () => {
        if (isFirst()) return;
        clearTimeout(currentTimeoutId);
        buttonOpacityReady = false;
        currentIndex--;
        maxVisibleOptionIndex = 0;
        revealOptions()
        selectedOption = currentStep.getSelectedOption();
        setTimeout(() => buttonOpacityReady = true, 850);
    }

    function revealOptions() {
        if ((maxVisibleOptionIndex == currentStep.options.length)) return;
        tick().then(() => currentTimeoutId = setTimeout(() => {
            maxVisibleOptionIndex++;
            revealOptions();
        }, (800 / currentStep.options.length)));
    }

    onMount(() => {
        selectedOption = currentStep.getSelectedOption();

        setTimeout(() => {
            revealOptions()

            setTimeout(() => buttonOpacityReady = true, 800);
        }, 1000)

        window.addEventListener("keypress", (event) => {
            if (event.key.toLowerCase() !== "e") return;
            checkSheet();
        })
    })

    function checkSheet() {
        const result = {
            steps: sheet.getSteps().map(step => ({
                label: step.label,
                selectedOption: step.getSelectedOption(),
                options: step.options.map((option, index) => ({
                    text: option.text,
                    index: index
                }))
            }))
        };
        console.log(result);
    }

</script>

{#key currentStep}
    <div class="step-window" transition:blur>
            <div class="content">
                <p class="label">{currentStep.label}</p>
                <div class="options">
                    {#each currentStep.options as option, index (option.uuid)}
                        <button
                                class="option {index}"
                                style:opacity={index < maxVisibleOptionIndex ? "1" : "0"}
                                style:background-color={selectedOption === index ? "rgba(0, 0, 0, 0.5)" : ""}
                                onclick={() => {
                                    if (selectedOption === index) { selectedOption = undefined; return; }
                                    selectedOption = index
                                }}
                        >
                            {option.getText()}
                        </button>
                    {/each}
                </div>
            </div>
            <div class="buttons">
                <button
                        disabled={isFirst()}
                        onclick={previous}
                        style:opacity={ buttonOpacityReady && (currentIndex > 0 || isFirst()) ? "1" : "0" }>
                    Previous
                </button>
                <button
                        disabled={isLast()}
                        class:unclickable={selectedOption === undefined}
                        onclick={next}
                        style:opacity={ buttonOpacityReady && selectedOption !== undefined ? "1" : "0" }>
                    Next
                </button>
            </div>
    </div>
{/key}

<style lang="scss">
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1 }
    }

    .step-window {
        font-size: 1.5rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
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
            color: white;
            text-shadow: rgb(0, 0, 0) 0 0 15px;
            animation: fadeIn ease-in-out 1s;
            transition: opacity 1s ease;
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        .options {
            .option {
                transition: opacity 1s ease, background-color 0.25s ease;
                flex: none;
            }
            &::after {
                content: "";
                flex: auto;
            }
            margin: 0 5rem 20px 5rem;
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
            transition: opacity 1s ease;
            min-width: 100%;
        }
    }

    button {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif;
        font-size: 1rem;
        border: 0;
        background-color: rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        padding: 8px;
        color: white;
        cursor: pointer;
        transition: background-color 0.25s ease;
        &:disabled {
            color: rgba(217, 152, 255, 0.5);
            background-color: rgba(0, 0, 0, 0.05);
        }
        &.unclickable {
            pointer-events: none;
        }
        &:hover {
            background-color: rgba(0, 0, 0, 0.25);
        }
        &:disabled:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }
</style>