import type { Step } from "$lib/sheet";

export class Sheet {
    steps: Step[] = [];

    constructor(steps: Step[]) {
        this.steps = steps;
    }

    getSteps(): Step[] {
        return this.steps;
    }

    getStep(index: number): Step {
        return this.steps[index];
    }
}