import { SudokuDTO } from "./sudoku-dto.model";
import { SudokuCalculationService } from "../services/sudoku-calculation.service";
import { SudokuCell } from "./sudoku-cell.model";

export class Sudoku {
    public cells: SudokuCell[][] = [];

    constructor() {
        let cellsTmp: SudokuCell[][] = [];

        for (let row = 0; row < 9; row++) {
            let tableRow: SudokuCell[] = [];
            
            for (let col = 0; col < 9; col++) {
                let idx = SudokuCalculationService.getIdxFromCoordinates(row, col);

                const element = 0;
                const maskElement = true;
                const valuesElement = 0;
                
                let cell: SudokuCell = new SudokuCell(element, maskElement, valuesElement)

                tableRow.push(cell);
            }

            cellsTmp.push(tableRow);
        }

        this.cells = cellsTmp;
    }

    public fromDTO(dto: SudokuDTO): Sudoku {
        let cellsTmp: SudokuCell[][] = [];

        for (let row = 0; row < 9; row++) {
            let tableRow: SudokuCell[] = [];
            
            for (let col = 0; col < 9; col++) {
                let idx = SudokuCalculationService.getIdxFromCoordinates(row, col);

                const element = dto.cells.at(idx);
                const maskElement = dto.mask.at(idx);
                const valuesElement = (maskElement === true ? (element !== undefined ? element : 0) : 0);
                
                let cell: SudokuCell = new SudokuCell(element, maskElement, valuesElement);

                tableRow.push(cell);
            }

            cellsTmp.push(tableRow);
        }

        this.cells = cellsTmp;

        return this;
    }
}
