<script lang="ts">
    import Wizard from './wizard.svelte'
    import { Option, Sheet, Step } from "$lib/sheet";
    import data from '$lib/data.json'

    const steps: Step[] = [];

    data.steps.forEach(step => {
        const options: Option[] = [];
        step.options.forEach((value) => {
            options.push(new Option(value));
        })
        steps.push(new Step(step.title, options))
    })

    const sheet: Sheet = new Sheet(steps);
</script>

<Wizard { sheet }></Wizard>

<style lang="scss">
    :global(body) {
        overflow: hidden;
        scrollbar-width: none;
        margin: 0;
        height: 100vh;
        width: 100vw;
        background: #453a59;
        background: linear-gradient(90deg,rgba(105, 70, 158, 1) 0%, rgba(99, 33, 95, 1) 98%);
    }
</style>