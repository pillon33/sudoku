export class SudokuCell {
    public cell: number = 0;
    public mask: boolean = false;
    public value: number = 0;
    public isSelected: boolean = false;

    constructor(cell?: number, mask?: boolean, value?: number, isSelected?: boolean) {
        this.cell = cell ?? 0;
        this.mask = mask ?? false;
        this.value = value ?? 0;
        this.isSelected = isSelected ?? false;
    }
}