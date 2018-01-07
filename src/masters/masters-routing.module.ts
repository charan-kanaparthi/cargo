import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MastersComponent } from './masters.component';
import { StatesComponent } from './states.component';
import { CitiesComponent } from './cities.component';
import { ItemsComponent } from './items.component';
import { Item_CategoriesComponent } from './item_categories.component';
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
        path: 'customers',
        component:CustomersComponent,
        data:
        {
          title: 'Customers'
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
