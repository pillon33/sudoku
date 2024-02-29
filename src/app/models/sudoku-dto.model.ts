export class SudokuDTO {
    public cells: number[] = [];
    public mask: boolean[] = [];
    public score: number = 0;

    SudokuDTO() {}

    public deserialize(input: any): SudokuDTO {
        this.cells = input.cells;
        this.mask = input.mask;
        this.score = input.score;

        return this;
    }
}
