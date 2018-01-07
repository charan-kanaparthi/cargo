import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargoOperationsComponent } from './cargo_operations.component';
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


const routes: Routes = [
  {
    path: '',
    component: CargoOperationsComponent,
    data: {
      title: 'CargoOperations'
    },
    children: [
       {
        path: 'branch_income',
         component:BranchIncomeComponent,
        data: {
          title: 'BranchIncome'
        }
      },
      {
        path: 'cancelled_cargo',
        component:CancelledCargoLRComponent,
        data: {
          title: 'CancelledCargoLR'
        }
      },
      {
        path: 'cargo_acceptance',
        component:CargoAcceptanceComponent,
        data: {
          title: 'CargoAcceptance'
        }
      },
       {
        path: 'cargo_booking',
        component:CargoBookingComponent,
        data: {
          title: 'CargoBooking'
        }
      },
       {
        path: 'cargo_delivery',
        component:CargoDeliveryComponent,
        data: {
          title: 'CargoDelivery'
        }
      },
       {
        path: 'LR_history',
        component:LRHistoryComponent,
        data: {
          title: 'LRHistory'
        }
      },
       {
        path: 'offline_booking',
        component:OfflineBookingComponent,
        data: {
          title: 'OfflineBooking'
        }
      },
      {
        path: 'service_allotment',
        component:ServiceAllotmentComponent,
        data: {
          title: 'ServiceAllotment'
        }
      },
       {
        path: 'service_unallotment',
        component:ServiceUnallotmentComponent,
        data: {
          title: 'ServiceUnallotment'
        }
      },
      {
        path: 'transshipment',
        component:TransshipmentComponent,
        data: {
          title: 'Transshipment'
        }
      },
      {
        path: 'vehicle_allotment',
        component:VehicleAllotmentComponent,
        data: {
          title: 'VehicleAllotment'
        }
      },
        {
      path: 'local_transshipment_sheets',
      component:LocalTransshipmentSheetsComponent,
      data: {
        title: 'LocalTransshipmentSheets'
      }
      },
        {
      path: 'local_transshipment',
      component:LocalTransshipmentComponent,
      data: {
        title: 'LocalTransshipment'
      }
    },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoOperationsRoutingModule {}
