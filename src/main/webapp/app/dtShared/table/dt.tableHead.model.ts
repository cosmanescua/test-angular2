export class TableHead {
    private field: string;
    private header: string;

    constructor(private _field: string,
                private _header: string){
        this.field = _field;
        this.header = _header;
    }
}