import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

}
