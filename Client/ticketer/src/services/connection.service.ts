import { RailwayStation } from './../models/railwayStation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Journey } from 'src/models/journey';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  public autoCompleteStationName(nameToAutoComplete: string, amountOfResponses: number): Observable<RailwayStation>{
    return this.http.post<RailwayStation>("http://127.0.0.1:8000/autoComplete", {
      name: nameToAutoComplete,
      amount: amountOfResponses
    })
  }

  public getJourneyBetweenTwoStations(idOfFirstStation: string, idOfSecondStation: string, amountOfConnections: number): Observable<Journey>{
    return this.http.post<Journey>("http://127.0.0.1:8000/getJourney", {
      firstId: idOfFirstStation,
      secondId: idOfSecondStation,
      amount: amountOfConnections
    });
  }
}
