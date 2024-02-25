import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuElement } from '../models/menu-element.type';
import { SudokuDTO } from '../models/sudoku-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  public baseUrl = environment.backendAddress;
  constructor(
    private http: HttpClient
  ) {}

  public getBoard(path: string) {
    return this.http.get(environment.backendAddress + path);
  }

  public getBoardWithNumberOfFields(path: string, numberOfFields: number) {
    const url = `${path}${environment.getPuzzleEndpoint}`;

    let params: HttpParams = new HttpParams({});
    params = params.append("numberOfFields", numberOfFields);

    console.log(this.baseUrl + url);
    
    return this.http.get(this.baseUrl + url, {params: params});
  }

  public getAvailableResolversList(): Observable<Object[]> {
    const url = `${environment.getAvailableResolversEndpoint}`;

    console.log(this.baseUrl + url);

    return this.http.get(this.baseUrl + url) as (Observable<Object[]>);
  }

  public getResolverMoves(path: string, sudoku: SudokuDTO): Observable<Object[]> {
    const url = `${path}${environment.getMovesEndpoint}`;

    console.log(this.baseUrl + url);
    
    return this.http.post(this.baseUrl + url, sudoku) as (Observable<Object[]>);
  }
}
