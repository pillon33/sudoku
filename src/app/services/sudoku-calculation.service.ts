import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class SudokuCalculationService {
    constructor() {}
  
    public static getIdxFromCoordinates(row: number, col: number): number {
        let idx = 0;

        idx = row * 9 + col;

        return idx;
    }
  }
  