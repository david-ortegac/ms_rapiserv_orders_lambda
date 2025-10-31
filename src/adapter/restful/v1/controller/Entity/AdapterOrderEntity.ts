import { AdapterProductEntity } from './AdapterProductEntity';

export interface AdapterOrderEntity {
  id?: number;
  mesa: number;
  cliente: string;
  productos: AdapterProductEntity[];
  impuesto: number;
  descuento: number;
  propina: number;
  subtotal: number;
  total: number;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  creadoPor: string;
  actualizadoPor: string;
}
