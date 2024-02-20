export class ResolverMove {
    row: number = 0;
    column: number = 0;
    insertedValue: number = 0;
    candidates: number[] = [];

    public deserialize(input: any): ResolverMove {
        this.row = input.row;
        this.column = input.column;
        this.insertedValue = input.insertedValue;
        this.candidates = input.candidates;

        return this;
    }
}
