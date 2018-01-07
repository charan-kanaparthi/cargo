import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { AgentsComponent } from './agents.component';
import { BranchesComponent } from './branches.component';
import { UsersComponent } from './users.component';
import { VehicleComponent } from './vehicles.component';
import { ModalsComponent } from './modals.component';
import { VehicleStaffComponent } from './vehicle-staff.component';
import{RoutesComponent} from './routes.component';
import{LocalVehiclesComponent} from './local_vehicles.component';
const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    data: {
      title: 'Manage'
    },
    children: [
      {
        path: 'agents',
        component:AgentsComponent,
        data: {
          title: 'Agents'
        }
      },
      {
        path: 'branches',
        component:BranchesComponent,
        data: {
          title: 'Branches'
        }
      },
      {
        path: 'users',
        component:UsersComponent,
        data: {
          title: 'Users'
        }
      },
      
      {
        path: 'local_vehicles',
        component:LocalVehiclesComponent,
        data: {
          title: 'Local Vehciles'
        }
      },
      {
        path: 'vehicles',
        component:VehicleComponent,
        data: {
          title: 'Vehicle'
        }
      },
       {
        path: 'vehiclestaff',
        component:VehicleStaffComponent,
        data: {
          title: 'Vehicle Staff'
        }
      },
       {
        path: 'routes',
        component:RoutesComponent,
        data: {
          title: 'Routes'
        }
      },
         {
        path: 'modals',
        component: ModalsComponent,
        data: {
          title: 'Modals'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule {}
