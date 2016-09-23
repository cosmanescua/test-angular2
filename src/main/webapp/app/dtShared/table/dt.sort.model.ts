export class Sort {
    private field: string;
    private type: string;

    constructor(_field: string,
                _type: string){
        this.field = _field;
        this.type = _type;
    }

    getName(): string {
        return this.field;
    }
    getType(): string {
        return this.type;
    }
}