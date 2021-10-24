import { Injectable } from "@angular/core";
import { Buro } from "app/models/buro.model";
import { map } from "rxjs/operators";
import { ApiService } from "./shared/api.service";

@Injectable({
    providedIn: 'root'
  })
  export class BuritoService {
  
    constructor(private apiService: ApiService) {
  
    }

    getContracargos() {
      const path = 'chargebacks';
      return this.apiService.get(path).pipe(map(data => this.ngoJsonAdopter(data)));
    }

    ngoJsonAdopter(ngoData: any = []) {
      const buros: Array<Buro> = [];
      if (ngoData.length === undefined) {
        ngoData = [ngoData];
      }
      for (const key in ngoData) {
        if (ngoData[key] !== undefined) {
          const data = ngoData[key];
          const buro: Buro = new Buro();
          buro.id = data.id;
          buro.codigoContracargo = data.codigoContracargo;
          buro.descripcionContracargo = data.descripcionContracargo;
          buro.importeContracargo = data.importeContracargo;
          buro.folio = data.folio;
          buro.estado = data.estado;

          buros.push(buro);
        }
      }
      return buros;
    }
}