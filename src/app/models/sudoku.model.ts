import { SudokuDTO } from "./sudoku-dto.model";
import { SudokuCalculationService } from "../services/sudoku-calculation.service";

export class Sudoku {
    public cells: number[][] = [];
    public mask: boolean[][] = [];
    public values: number[][] = [];

    Sudoku() {
        let cellsTmp: number[][] = [];
        let maskTmp: boolean[][] = [];
        let valuesTmp: number[][] = [];

        for (let row = 0; row < 9; row++) {
            let tableRow: number[] = [];
            let maskRow: boolean[] = [];
            let valuesRow: number[] = [];
            
            for (let col = 0; col < 9; col++) {
                let idx = SudokuCalculationService.getIdxFromCoordinates(row, col);

                const element = 0;
                const maskElement = true;
                const valuesElement = 0;
                
                tableRow.push(element);
                maskRow.push(maskElement);
                valuesRow.push(valuesElement);
            }

            cellsTmp.push(tableRow);
            maskTmp.push(maskRow);
            valuesTmp.push(valuesRow);
        }

        this.cells = cellsTmp;
        this.mask = maskTmp;
        this.values = valuesTmp;
    }

    public fromDTO(dto: SudokuDTO): Sudoku {
        let cellsTmp: number[][] = [];
        let maskTmp: boolean[][] = [];
        let valuesTmp: number[][] = [];

        for (let row = 0; row < 9; row++) {
            let tableRow: number[] = [];
            let maskRow: boolean[] = [];
            let valuesRow: number[] = [];
            
            for (let col = 0; col < 9; col++) {
                let idx = SudokuCalculationService.getIdxFromCoordinates(row, col);

                const element = dto.cells.at(idx);
                const maskElement = dto.mask.at(idx);
                const valuesElement = (maskElement === true ? (element !== undefined ? element : 0) : 0);
                
                if (element !== undefined) {
                    tableRow.push(element);
                }

                if (maskElement !== undefined) {
                    maskRow.push(maskElement);
                }

                valuesRow.push(valuesElement);
            }

            cellsTmp.push(tableRow);
            maskTmp.push(maskRow);
            valuesTmp.push(valuesRow);
        }

        this.cells = cellsTmp;
        this.mask = maskTmp;
        this.values = valuesTmp;

        return this;
    }
}
