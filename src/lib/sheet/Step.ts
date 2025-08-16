import type { Option } from "$lib/sheet";

export class Step {
    uuid: string;
    label: string;
    options: Option[] = [];
    selectedOptionIndex: number | undefined;

    constructor(label: string, options: Option[]) {
        this.label = label;
        this.options = options;
        this.uuid = crypto.randomUUID();
        this.selectedOptionIndex = undefined
    }

    setSelectedOption(index: number) {
        this.selectedOptionIndex = index;
    }

    getSelectedOption(): Option | undefined {
        if (this.selectedOptionIndex === undefined) return undefined;
        return this.options[this.selectedOptionIndex];
    }

    haveSelectedOption(): boolean {
        return (this.selectedOptionIndex !== undefined);
    }
}