import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { ServiceBase } from './service.base';

@Injectable({
  providedIn: 'root',
})
export class MovimentoRoboService extends ServiceBase{
    constructor(private _http: HttpClient) {
      super();
    }

    public endpoint = 'MovimentoRobo/';
    private dataSource = new BehaviorSubject<any>([]);
    currenteData = this.dataSource.asObservable();

    carregarMovimentosRobo(): Observable<any> {
      return this._http
        .get(`${environment.urlApi}${this.endpoint}carregar-movimentos-robo`)
        .pipe(map(this.extractData), catchError(this.serviceError));
    }
}
