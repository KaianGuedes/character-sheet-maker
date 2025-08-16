import type { Option } from "$lib/sheet";

export class Step {
    uuid: string;
    label: string;
    options: Option[] = [];

    constructor(label: string, options: Option[]) {
        this.label = label;
        this.options = options;
        this.uuid = crypto.randomUUID();
    }
}