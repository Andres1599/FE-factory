import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PartInterface } from '../../../interfaces/PartInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { PartService } from '../../services/part/part.service';
import { CrudInterface } from '../../utiles/crudInterface';
import { PartDialogComponent } from '../part-dialog/part-dialog.component';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { PartVehicleDialogComponent } from '../part-vehicle-dialog/part-vehicle-dialog.component';
import { ActionReturnInterface } from '../../../interfaces/ActionReturnInterface';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit, CrudInterface<PartInterface> {
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'price',
    'options'
  ];
  parts: PartInterface[] = [];
  dataSource: MatTableDataSource<PartInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _PART_SERVICE: PartService
  ) {}

  ngOnInit() {
    this.getParts();
  }

  private getParts(): void {
    try {
      this._PART_SERVICE.readProduct().subscribe((value: any) => {
        if (value) {
          this.parts = value;
          this.dataSource = new MatTableDataSource<PartInterface>(this.parts);
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los repuestos',
        JSON.stringify(error.name)
      );
    }
  }

  private createPart(part: PartInterface): void {
    try {
      this._PART_SERVICE.newProduct(part).subscribe((value: any) => {
        if (value) {
          this._DIALOG_SERVICE.showSuccess();
          this.getParts();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantCreate(item?: PartInterface): void {
    try {
      const part: PartInterface = {
        description: '',
        name: '',
        partNo: '',
        price: null,
        vehicles: []
      };
      this._DIALOG_SERVICE.shareData = part;
      this._DIALOG_SERVICE
        .openDialog(PartDialogComponent)
        .beforeClosed()
        .subscribe(value => {
          if (value) {
            this.createPart(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al crear un nuevo repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  private updatePart(part: PartInterface): void {
    try {
      this._PART_SERVICE.updateProduct(part).subscribe((value: any) => {
        if (value) {
          this._DIALOG_SERVICE.showSuccess();
          this.getParts();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantEdit(item?: PartInterface): void {
    try {
      this._DIALOG_SERVICE.shareData = item;
      this._DIALOG_SERVICE
        .openDialog(PartDialogComponent)
        .beforeClosed()
        .subscribe(value => {
          if (value) {
            this.updatePart(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al actualizar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  private deletePart(part: PartInterface): void {
    try {
      this._PART_SERVICE.deleteProduct(part).subscribe((value: any) => {
        if (value) {
          this._DIALOG_SERVICE.showSuccess();
          this.getParts();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantDelete(item?: PartInterface): void {
    try {
      this._DIALOG_SERVICE
        .showDelete(
          'Eliminar',
          'Estas seguro de que quieres eliminar este repuesto.',
          null
        )
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deletePart(item);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al eliminar un repuesto.',
        JSON.stringify(error.name)
      );
    }
  }

  wantUpdateVehicles(product: PartInterface) {
    try {
      this._DIALOG_SERVICE.shareData = product;
      this._DIALOG_SERVICE
        .openDialog(PartVehicleDialogComponent)
        .beforeClosed()
        .subscribe((value: ActionReturnInterface) => {
          if (value.type === 'delete') {
            const index = product.vehicles.indexOf(value.data);
            if (index > -1) {
              product.vehicles.splice(index, 1);
              this.assignVehicle(product);
            }
          } else if (value.type === 'assign') {
            product.vehicles.push(value.data);
            this.assignVehicle(product);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al interactuar con los vehiculos del repuesto.'
      );
    }
  }

  private assignVehicle(product: PartInterface) {
    try {
      this._PART_SERVICE
        .assignVehicleProduct(product)
        .subscribe((value: any) => {
          if (value) {
            /* message success here */
            this.getParts();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        error,
        'Error',
        'Error al asignar un vehiculo al repuesto.'
      );
    }
  }
}
