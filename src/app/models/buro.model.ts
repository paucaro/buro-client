class Buro {
  id: string = null;
  codigoContracargo: string = null;
  descripcionContracargo: string = null;
  importeContracargo: string = null;
  folio: string = null;
  estado: string = null;
  operacion: Operacion = null;
  comercio: Comercio = null;
  usuario: Usuario = null;
  cuenta: Cuenta = null;
}

class Operacion {
    fechaVenta: string = null;
    tipoOperativa: string = null;
    importe: string = null;
    autorizacion: string = null;
}

class Cuenta {
    cuenta: string = null;
    tipoTarjeta: string = null;
    tarjetaNacionalExtrangera: string = null;
    mombreTarjetahabiente: string = null;
    bin: string = null;
    idMarca: number = 0;
    marca: string = null;
    bancoEmisor: string = null;
}

class Usuario {
    nombreComprador: string = null;
    telefono: string = null;
    email: string = null;
    codigoPostal: string = null;
    direccion: Direccion = null;
}

class Direccion {
    calle: string = null;
      numero: string = null;
      colonia: string = null;
      ciudad: string = null;
      estado: string = null;
}

class Comercio {
    afiliacion: string = null;
    comercio: string = null;
    ip: string = null;
    ubicacion: Ubicacion = null;
}

class Ubicacion {
    colonia: string = null;
      ciudad: string = null;
      estado: string = null;
}

export { Buro}