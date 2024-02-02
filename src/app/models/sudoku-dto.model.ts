export class SudokuDTO {
    public cells: number[] = [];
    public mask: boolean[] = [];

    SudokuDTO() {}

    public deserialize(input: any): SudokuDTO {
        this.cells = input.cells;
        this.mask = input.mask;

        return this;
    }
}
