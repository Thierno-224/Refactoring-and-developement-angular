import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {OlympicModel} from "../models/olympic-models";

@Injectable({
  providedIn: "root"
})

export class DataService {
  private http = inject(HttpClient);
  private olympicUrl = './assets/mock/olympic.json';

  getOlympic() : Observable<OlympicModel[]> {
    return this.http.get<OlympicModel[]>(this.olympicUrl);
  }

  getOlympicById(id : number) : Observable<OlympicModel | undefined> {
    return this.getOlympic().pipe(
      map(data => data.find(country => country.id === id))
    );
  }

  getOlympicByCountry(name : string) : Observable<OlympicModel | undefined> {
    return this.getOlympic().pipe(
      map(data => data.find(c => c.country.toLowerCase() === name.toLowerCase()))
    );
  }
}
