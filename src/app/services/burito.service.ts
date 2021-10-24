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
        if (ngoData[key] !== undefined && Number(ngoData[key].Key) > 10) {
          const data = ngoData[key];
          const buro: Buro = new Buro();
          buro.id = data.Key;
          buro.codigoContracargo = data.Record.codigoContracargo;
          buro.descripcionContracargo = data.Record.descripcionContracargo;
          buro.importeContracargo = data.Record.importeContracargo;
          buro.folio = data.Record.folio;
          buro.estado = data.Record.estado;
          buro.operacion = data.Record.operacion;
          buro.comercio = data.Record.comercio;
          buro.usuario = data.Record.usuario;
          buro.cuenta = data.Record.cuenta;

          buros.push(buro);
        }
      }
      return buros;
    }
}