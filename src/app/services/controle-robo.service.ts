import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { ServiceBase } from './service.base';

@Injectable({
  providedIn: 'root',
})
export class ControleRoboService extends ServiceBase{
    constructor(private _http: HttpClient) {
      super();
    }

    public endpoint = 'ControleRobo/';
    private dataSource = new BehaviorSubject<any>([]);
    currenteData = this.dataSource.asObservable();

    obterEstadoInicialRobo(): Observable<any> {
      return this._http
        .get(`${environment.urlApi}${this.endpoint}obter-estado-inicial-robo`)
        .pipe(map(this.extractData), catchError(this.serviceError));
    }

    acionarRobo(controlaRobo: any): Observable<any> {
      return this._http
        .post(`${environment.urlApi}${this.endpoint}acionar-robo`, controlaRobo)
        .pipe(map(this.extractData), catchError(this.serviceError));
    }
}
