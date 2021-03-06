import { VehicleInterface } from './VehicleInterface';
export interface PartInterface {
  _id?: number;
  name?: string;
  description?: string;
  partNo?: string;
  price?: number;
  image?: string;
  vehicles?: VehicleInterface[];
}
