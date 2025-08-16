<script lang="ts">
    import Wizard from './wizard.svelte'
    import { Option, Sheet, Step } from "$lib/sheet";

    // Class Step
    const classOptions: Option[] = [];
    const classes: string[] = ["Warrior", "Mage", "Archer"];
    for (const value of classes) {
        classOptions.push(new Option(value));
    }

    // Race Step
    const raceOptions: Option[] = [];
    const races: string[] = [
        "Human", "Elf", "Dwarf", "Goblin",
        "Orc","Lizard", "Fairy", "Dragonborn"
    ];
    for (const value of races) {
        raceOptions.push(new Option(value));
    }

    // Gender Step
    const genderOptions: Option[] = [];
    const genders: string[] = ["Male", "Female"];
    for (let value in genders) {
        genderOptions.push(new Option(genders[value]));
    }

    // Sheet Creation
    const steps: Step[] = [];
    steps.push(new Step("Choose your race", raceOptions));
    steps.push(new Step("Choose your gender", genderOptions));
    steps.push(new Step("Choose your class", classOptions))

    const sheet: Sheet = new Sheet(steps);
</script>

<Wizard { sheet }></Wizard>

<style lang="scss">
    :global(body) {
        margin: 0;
        height: 100vh;
        width: 100vw;
        background-color: cadetblue;
    }
</style>