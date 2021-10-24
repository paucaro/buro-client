import { Injectable } from "@angular/core";
import { ApiService } from "./shared/api.service";

@Injectable({
    providedIn: 'root'
  })
  export class BuritoService {
  
    constructor(private apiService: ApiService) {
  
    }

    buritoJsonAdapter() {
        
    }
}