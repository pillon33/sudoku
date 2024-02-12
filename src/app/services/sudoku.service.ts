import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  constructor(
    private http: HttpClient
  ) {}

  public getBoard(path: string) {
    return this.http.get(environment.backendAddress + path);
  }
}
