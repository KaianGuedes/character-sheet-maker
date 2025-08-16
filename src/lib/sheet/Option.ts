export class Option {
    text: string;
    uuid: string;

    constructor(text: string) {
        this.text = text;
        this.uuid = crypto.randomUUID();
    }

    getText() {
        return this.text;
    }
}