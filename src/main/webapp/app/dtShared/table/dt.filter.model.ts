export class Filter {
    private field: string;
    private query: string;

    constructor(_name: string, _query: string){
        this.field = _name;
        this.query = _query
    }
}