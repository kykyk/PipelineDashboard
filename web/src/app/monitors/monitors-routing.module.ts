import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard hub components
import { EditProjectResolver } from '../core/resolvers/edit-project.resolver';
import { PingResolver } from '../core/resolvers/ping.resolver';
import { ViewProjectResolver } from '../core/resolvers/view-project.resolver';
import { MonitorCreateEditComponent } from './monitor-create-edit/monitor-create-edit.component';
import { MonitorsListComponent } from './monitors-list/monitors-list.component';
import { PingsListComponent } from './pings-list/pings-list.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorsListComponent,
    resolve: { project: ViewProjectResolver },
  },
  {
    path: 'create',
    component: MonitorCreateEditComponent,
    resolve: { project: EditProjectResolver },
  },
  {
    path: ':monitorUid',
    component: MonitorCreateEditComponent,
    resolve: { project: EditProjectResolver },
  },
  {
    path: ':monitorUid/pings',
    component: PingsListComponent,
    resolve: { project: PingResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorsRoutingModule { }
