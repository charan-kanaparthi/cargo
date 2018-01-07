import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components Routing
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { CargoOperationsComponent } from './cargo_operations.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { SelectModule } from 'ng2-select';
import { CargoOperationsService } from './cargo_operations.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import {CargoOperationsRoutingModule} from './cargo-routing.module';
import {BranchIncomeComponent} from './branch_income.component';
import {CancelledCargoLRComponent} from './cancelled_LR.component';
import{CargoAcceptanceComponent} from './cargo_acceptance.component';
import{CargoBookingComponent} from './cargo_booking.component';
import {CargoDeliveryComponent} from "./cargo_delivery.component";
import {LRHistoryComponent} from "./LR_history.component";
import {OfflineBookingComponent} from "./offline_booking.component";
import {ServiceAllotmentComponent} from "./service_allotment.component";
import {ServiceUnallotmentComponent} from "./service_unallotment.component";
import {TransshipmentComponent} from "./transshipment.component";
import {VehicleAllotmentComponent} from "./vehicle_allotment.component";
import {LocalTransshipmentSheetsComponent} from "./local_transshipment_sheets.component";
import {LocalTransshipmentComponent} from "./local_transshipment.component";
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  imports: [
    CargoOperationsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SelectModule,
    ModalModule.forRoot(),
    NgxMyDatePickerModule,
    MyDateRangePickerModule
  ],
  declarations: [
    CargoOperationsComponent,
    BranchIncomeComponent,
    CancelledCargoLRComponent,
    CargoAcceptanceComponent,
    LocalTransshipmentComponent,
    LocalTransshipmentSheetsComponent,
    CargoBookingComponent,
    CargoDeliveryComponent,
    LRHistoryComponent,
    OfflineBookingComponent,
    ServiceAllotmentComponent,
    ServiceUnallotmentComponent,
    TransshipmentComponent,
    VehicleAllotmentComponent
  ]
  ,
  providers:[CargoOperationsService]
})
export class CargoOperationsModule { }
