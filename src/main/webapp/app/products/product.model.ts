export class Product{
    private name: string;
    private price: number;
    private date: number;

    constructor( name: string, price: number, date: number){
        this.name = name;
        this.price = price;
        this.date = date;
    }
}