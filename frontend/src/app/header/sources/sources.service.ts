import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class SourcesService {
  constructor(private http: HttpClient) {}

  fetchAllSources() {
    return this.http.get<{data: Object[]}>('http://localhost:5000/sources');
  }
}
