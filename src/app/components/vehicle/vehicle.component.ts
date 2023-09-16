import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ModalVehicleComponent } from './modal-vehicle/modal-vehicle.component';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol', 'color', 'update'];
  dataSource = new MatTableDataSource<PeriodicElement>;
  private mySubscribe: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehiclesService: VehiclesService,
    private liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {  }

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

  getVeicles() {
    this.mySubscribe.push(this.vehiclesService.getVeicles().subscribe((resp) => {
      this.dataSource.data = resp
    }, error => {
      console.log("error", error.message);
    }))
  }

  public updateVeicles(): void {}

  public deleteVeicles(): void {}


  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalVehicleComponent, {
      height: '300px',
      width: '800px',
      data: { name: 'Cheguei' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }
}
