export class SudokuCell {
    public cell: number = 0;
    public mask: boolean = false;
    public value: number = 0;

    SudokuCell(cell?: number, mask?: boolean, value?: number) {
        this.cell = cell ?? 0;
        this.mask = mask ?? false;
        this.value = value ?? 0;
    }
}