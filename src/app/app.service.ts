import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonInfo} from "./app.types";
import {Injectable} from "@angular/core";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }

  public getData(): Observable<PersonInfo[]> {
    return this.http.get<PersonInfo[]>('../assets/mock/getDataResponse.json');
  }
}
