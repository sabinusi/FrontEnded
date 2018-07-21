import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PopupModule} from 'ng2-opd-popup';
import { AppComponent } from './app.component';

import { DashboardComponent } from './student/dashboard.component';
import { HeadComponent } from './student/head/head.component';

import { routing } from './router.component';
import { ChartsModule } from 'ng2-charts';

import { LoginComponent } from './login.component';
import { ViewSupervisorComponent } from './student/view-supervisor.component';
import { MessagesComponent } from './student/messages.component';

import { ReportsComponent } from './student/reports.component';
import { ConceptNoteComponent } from './student/concept-note.component';
import { ForgetPasswordComponent } from './forget-password.component';

import { ProfileComponent } from './student/profile.component';
import { ProjectArchiveComponent } from './student/project-archive.component';
import { ViewPastProjectsComponent } from './student/view-past-projects.component';


import { PanelComponent } from './supervisor/panel.component';
import { MygroupComponent } from './supervisor/mygroup.component';
import { SubmitedReportsComponent } from './supervisor/submited-reports.component';

import { BarComponent } from './supervisor/head/bar.component';
import { StdMessagesComponent } from './supervisor/std-messages.component';
import { ReceivedConceptComponent } from './supervisor/received-concept.component';
import { ViewConceptNoteComponent } from './coordinator/view-concept-note.component';
import { AnnaucementComponent } from './coordinator/annaucement.component';

import { AssignGroupComponent } from './coordinator/assign-group.component';
import { ViewGroupsComponent } from './coordinator/view-groups.component';
import { CordinatorHeadComponent } from './coordinator/head/cordinator-head.component';


import { SupervisorProfileComponent } from './supervisor/supervisor-profile.component';
import { CoordinatorProfileComponent } from './coordinator/coordinator-profile.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from "ng2-bootstrap/pagination";
import { SysteamControlComponent } from './coordinator/systeam-control.component';





@NgModule({
  declarations: [
    AppComponent,
     DashboardComponent,
    HeadComponent,
    LoginComponent,
    ViewSupervisorComponent,
    MessagesComponent,
    
    ReportsComponent,
    ConceptNoteComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    ProjectArchiveComponent,
    ViewPastProjectsComponent,
    
    PanelComponent,
    MygroupComponent,
    SubmitedReportsComponent,
    
    BarComponent,
    StdMessagesComponent,
    ReceivedConceptComponent,
    ViewConceptNoteComponent,
    AnnaucementComponent,
    
    
    AssignGroupComponent,
    ViewGroupsComponent,
    CordinatorHeadComponent,
    
    
    SupervisorProfileComponent,
    CoordinatorProfileComponent,
    SysteamControlComponent,


    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    Ng2TableModule,
    routing,
    PaginationModule.forRoot(),
    PopupModule.forRoot()
        
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
