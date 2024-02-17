import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuElement } from '../models/menu-element.type';

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
    params = params.append("numberOfFields", numberOfFields)
    
    return this.http.get(this.baseUrl + url, {params: params});
  }

  public getAvailableResolversList(): Observable<Object[]> {
    const url = `${environment.getAvailableResolversEndpoint}`;

    return this.http.get(this.baseUrl + url) as (Observable<Object[]>);
  }
}
