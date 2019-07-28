import { Injectable } from '@angular/core';
Injectable;

@Injectable()
export class LocalStorageService {
  addData(name: string, value: any) {
    localStorage.setItem(name, value);
  }

  removeData(name: string) {
    localStorage.removeItem(name);
  }

  fetchData(name: string) {
    return localStorage.getItem(name);
  }
}
