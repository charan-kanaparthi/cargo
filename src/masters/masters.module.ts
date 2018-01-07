import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components Routing
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { MastersComponent } from './masters.component';
import { StatesComponent } from './states.component';
import { CitiesComponent } from './cities.component';
import { ItemsComponent } from './items.component';
import { Item_CategoriesComponent } from './item_categories.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './modals.component';
import { MasterRoutingModule } from './masters-routing.module';
import { SelectModule } from 'ng2-select';
import { MastersService } from './masters.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import{CustomersComponent} from './customers.component';
import {TabularPanelComponent} from './tabularpanel.component';
import{EditTabularPanelComponent} from './edit_tabularpanel.component';


@NgModule({
  imports: [
    MasterRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SelectModule,
    ModalModule.forRoot(),
    NgxMyDatePickerModule
  ],
  declarations: [
    MastersComponent,
    StatesComponent,
    CitiesComponent,
    Item_CategoriesComponent,
    ItemsComponent,
    ModalsComponent,
    CustomersComponent,
    TabularPanelComponent,
    EditTabularPanelComponent
  ]
  ,
  providers:[MastersService]
})
export class MastersModule { }
