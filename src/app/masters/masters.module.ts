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
import { City_CodesComponent } from './city_codes.component';
import { Vehicle_CategoryComponent } from './vehicle_category.component';
import { ExpensesComponent } from './expenses.component';
import { IncomesComponent } from './incomes.component';
import { FreightComponent } from './freight.component';
import { FeedbacksComponent } from './feedbacks.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './modals.component';
import { CountriesComponent } from './countries.component';
import { MasterRoutingModule } from './masters-routing.module';
import { SelectModule } from 'ng2-select';
import { MastersService } from './masters.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
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
    NgxMyDatePickerModule,
    MyDateRangePickerModule
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
    EditTabularPanelComponent,
    City_CodesComponent,
    Vehicle_CategoryComponent,
    ExpensesComponent,
    IncomesComponent,
    FreightComponent,
    FeedbacksComponent,
    CountriesComponent
  ]
  ,
  providers:[MastersService]
})
export class MastersModule { }
