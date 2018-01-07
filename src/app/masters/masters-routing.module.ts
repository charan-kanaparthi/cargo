import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { CountriesComponent } from './countries.component';
import{CustomersComponent} from './customers.component';
import { ModalsComponent } from './modals.component';
import{TabularPanelComponent} from './tabularpanel.component';
import{EditTabularPanelComponent} from './edit_tabularpanel.component';

const routes: Routes = [
  {
    path: '',
    component: MastersComponent,
    data:
    {
      title: 'Masters'
    },
    children: 
    [
      {
        path: 'states',
        component:StatesComponent,
        data: 
        {
          title: 'States'
        }
      },
      {
        path: 'cities',
        component:CitiesComponent,
        data: 
        {
          title: 'Cities'
        }
      },
      {
        path: 'countries',
        component:CountriesComponent,
        data: 
        {
          title: 'Countries'
        }
      },
      {
        path: 'cityCodes',
        component:City_CodesComponent,
        data: 
        {
          title: 'CityCodes'
        }
      },
      {
        path: 'items',
        component:ItemsComponent,
        data: 
        {
          title: 'Items'
        }
      },
      {
        path: 'itemCategory',
        component:Item_CategoriesComponent,
        data: 
        {
          title: 'ItemCategory'
        }
      },
      {
        path: 'vehicleCategory',
        component:Vehicle_CategoryComponent,
        data: 
        {
          title: 'VehicleCategory'
        }
      },
       {
        path: 'customers',
        component:CustomersComponent,
        data:
        {
          title: 'Customers'
        }
      },
      {
        path: 'expenses',
        component:ExpensesComponent,
        data:
        {
          title: 'Expenses'
        }
      },
      {
        path: 'incomes',
        component:IncomesComponent,
        data:
        {
          title: 'Incomes'
        }
      },
      {
        path: 'freight',
        component:FreightComponent,
        data:
        {
          title: 'Freight'
        }
      },
      {
        path: 'modals',
        component: ModalsComponent,
        data: 
        {
          title: 'Modals'
        }
      },
      {
        path: 'feedbacks',
        component: FeedbacksComponent,
        data: 
        {
          title: 'Feedbacks'
        }
      },
      {
        path: 'tabularpanel',
        component: TabularPanelComponent,
        data: 
        {
          title: 'TabularPanel'
        }
      },
       {
        path: 'edittabularpanel',
        component: EditTabularPanelComponent,
        data: 
        {
          title: 'EditTabularPanel'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
