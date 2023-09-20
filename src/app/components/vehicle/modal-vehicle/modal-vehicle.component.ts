import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-modal-vehicle',
  templateUrl: './modal-vehicle.component.html',
  styleUrls: ['./modal-vehicle.component.scss']
})
export class ModalVehicleComponent implements OnInit {
  vehicleForm!: FormGroup
  public text!:string

  constructor(
    public dialogRef: MatDialogRef<ModalVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormUpdate();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public saveVeichle(): void {
    this.data.isCreate ? this.createVehicle() : this.updateVehicle();
  }

  public createVehicle(): void {
    this.vehiclesService.createVehicle(this.vehicleForm.value).subscribe((resp) => {
      console.log('Veiculo cadastrado com sucesso!');
      this.dialogRef.close(true);
    }, error => {
      console.log("Ocorreu um erro ao tentar salvar!");
    });
  }

  public updateVehicle(): void {
    this.vehiclesService.updateVecicle(this.data.vehicle.id, this.vehicleForm.value).subscribe((resp) => {
      console.log('Veiculo atualizado com sucesso!');
      this.dialogRef.close(true);
    }, error => {
      console.log("Ocorreu um erro ao tentar salvar!");
    })
  }

  public buildForm(): void {
    this.data.isCreate ? this.text = 'Cadastrar Veiculo' : this.text = 'Editar Veiculo';

    this.vehicleForm = new FormGroup({
      brand: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      yearVehicle: new FormControl( [Validators.required]),
      numberChassi: new FormControl("", [Validators.required]),
      color: new FormControl("", [Validators.required]),
    });
  }

  public buildFormUpdate(): void {
    if (!this.data.isCreate) {
      this.vehicleForm.patchValue({
        brand: this.data.vehicle.brand,
        model: this.data.vehicle.model,
        yearVehicle: this.data.vehicle.yearVehicle,
        numberChassi: this.data.vehicle.numberChassi,
        color: this.data.vehicle.color,
      })
    }
  }

}
