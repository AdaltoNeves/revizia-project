import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ModalVehicleComponent } from './modal-vehicle/modal-vehicle.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Ivehicle } from 'src/app/model/vehicle.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],

})
export class VehicleComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'brand', 'model', 'year', 'color', 'update', 'delete'];
  dataSource = new MatTableDataSource<Ivehicle>;
  dataSourceold = new MatTableDataSource<Ivehicle>;
  private mySubscribe: Subscription[] = [];

  filterBrand: string = '';
  filterModel: string = '';
  filterYear: string = '';
  showSpinner: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _vehiclesService: VehiclesService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getVeicles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.mySubscribe.forEach(s => s.unsubscribe());
  }

  public getVeicles(): void {
    this.dataSource.data = [];
    this.showSpinner = true;

    this.mySubscribe.push(this._vehiclesService.getVehicle().subscribe((resp) => {
      this.dataSource.data = resp
      this.dataSourceold.data = resp
      this.showSpinner = false;
    }));
  }

  public openDialogVehicle(_isCreate: boolean, _idVehicle?: Ivehicle): void {
    const dialogRef = this._dialog.open(ModalVehicleComponent, {
      height: '400px',
      width: '800px',
      data: { isCreate: _isCreate, vehicle: _idVehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVeicles();
      }
    });
  }

  public deleteVehicle(_idVehicle: number): void {
    const dialogRef = this._dialog.open(DialogConfirmComponent);
    dialogRef.

      afterClosed().subscribe(result => {
        if (result) {
          this._vehiclesService.deleteVecicle(_idVehicle).subscribe();
          this.getVeicles();
        }
      });
  }

  public filterVehicle(): void {

    this.dataSource.data = this.dataSourceold.data.filter((element) => {
      const marcaCoincide = this.filterBrand === '' || element.brand.toLowerCase().includes(this.filterBrand.toLowerCase());
      const modeloCoincide = this.filterModel === '' || element.model.toLowerCase().includes(this.filterModel.toLowerCase());
      const AnoCoincide = this.filterYear === '' || element.yearVehicle.toLowerCase().includes(this.filterYear.toLowerCase());
      
      return marcaCoincide && modeloCoincide && AnoCoincide;
    });
  }

  public cleanFilter(): void {
    this.filterBrand = '';
    this.filterModel = '';
    this.filterYear = '';
    this.filterVehicle();
  }
}













