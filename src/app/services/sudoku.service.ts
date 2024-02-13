import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  public getBoardWithNumberOfFields(path: string, numberOfFields: number) {
    const url = `${environment.backendAddress}${path}${environment.getPuzzleEndpoint}?numberOfFields=${numberOfFields}`;
    let params: HttpParams = new HttpParams({fromString: `numberOfFields=${numberOfFields}`});
    let headers: HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(url, {params: params, headers: headers}); //{params: params, headers: headers} 
  }
}
