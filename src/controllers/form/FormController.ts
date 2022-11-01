export default class FormController {
    public entries: {[name: string]: FormEntry} = {};
    public submitted = false;

    public register(name: string, configure: (entry: FormEntry) => void): FormEntry {
        if(this.entries.hasOwnProperty(name)) {
            return this.entries[name];
        }

        const entry = new FormEntry(name);
        this.entries[name] = entry;
        configure(entry);
        return entry;
    }

    public submit(): boolean {
        let valid = true;
        for (let key in this.entries) {
            const entry = this.entries[key];
            if(entry.validation() != true) {
                valid = false; //do not return here, as we need to validate every component
            }
        }

        this.submitted = true;

        return valid;
    }

    public getValues(): {[key: string]: any} {
        let vals: {[key: string]: any} = {};
        for (let key in this.entries) {
            vals[key] = this.entries[key].getter();
        }

        return vals;
    }
}

export class FormEntry {
    public readonly name: string;
    public validation: () => string | true = () => "Validation not defined";
    public getter: () => any = () => null;
    public setter: (value: any) => void = () => {};
    public displayError: (error: string | null) => void = () => {};

    constructor(name: string) {
        this.name = name;
    }

    public onValidate(callback: () => string | true) {
        this.validation = callback;
    }

    public onGet(callback: () => any) {
        this.getter = callback;
    }

    public onSet(callback: (value: any) => void) {
        this.setter = callback;
    }

    public onDisplayError(callback: (error: string | null) => void) {
        this.displayError = callback;
    }
}