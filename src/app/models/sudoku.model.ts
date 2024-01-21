export class Sudoku {
    public cells: number[] = [];
    public mask: boolean[] = [];

    Sudoku() {}

    public deserialize(input: any): Sudoku {
        this.cells = input.cells;
        this.mask = input.mask;

        return this;
    }
}
