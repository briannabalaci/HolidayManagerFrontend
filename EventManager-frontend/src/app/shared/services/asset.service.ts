import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  assetToFile(assetPath: string): Observable<File> {
    const path = '/assets/' + assetPath;
    return this.http.get(path, {
        responseType: "arraybuffer"
    })
    .pipe(
      map(response => {
        return new File([response], path);
      })
    );
  }
}
