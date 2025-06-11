import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class OlpService {

  private baseUrl = 'https://olp-deploy.azurewebsites.net/api/';

  constructor(private httpService:HttpService) { }

   getAllOLPEnquires(url:string): Observable<any[]> {
    return this.httpService.get<any[]>(`${this.baseUrl}/${url}`);
  }
  getOLPMaster(url:string): Observable<any[]> {
    return this.httpService.get<any[]>(`${this.baseUrl}/${url}`);
  }
   updateOLPEnquiry(id: number, payload: any): Observable<any> {
    return this.httpService.put<any>(`${this.baseUrl}WeddingEvents/${id}`, payload);
  }

}
