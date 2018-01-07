import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components Routing
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { ManageComponent } from './manage.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './modals.component';
import{ ManageRoutingModule} from './manage-routing.module';
import { AgentsComponent } from './agents.component';
import { BranchesComponent } from './branches.component';
import { UsersComponent } from './users.component';
import { VehicleComponent } from './vehicles.component';
import { VehicleStaffComponent } from './vehicle-staff.component';
import {ManageService} from './manage.service';
import{RoutesComponent} from './routes.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import{LocalVehiclesComponent} from './local_vehicles.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';


@NgModule({
  imports: [
    ManageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    NgxMyDatePickerModule,
    MyDateRangePickerModule
  ],
  declarations: [
    ManageComponent,
    AgentsComponent,
    BranchesComponent,
    UsersComponent,
    VehicleComponent,
    LocalVehiclesComponent,
    VehicleStaffComponent,
    ModalsComponent,
    RoutesComponent
  ]
  ,
  providers:[ManageService]
})
export class ManageModule { }
