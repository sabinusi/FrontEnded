	import { RouterModule,Routes} from '@angular/router';
	import { ModuleWithProviders} from '@angular/core';
	import { HeadComponent } from './student/head/head.component';
	import { AppComponent } from './app.component';
	import { LoginComponent } from './login.component';
	import { ViewSupervisorComponent } from './student/view-supervisor.component';
	import { MessagesComponent } from './student/messages.component';
	import { ViewPastProjectsComponent } from './student/view-past-projects.component';
	import { ReportsComponent } from './student/reports.component';
	import { ConceptNoteComponent } from './student/concept-note.component';
	import { ForgetPasswordComponent } from './forget-password.component';
	import { ProfileComponent } from './student/profile.component';
	import { ProjectArchiveComponent } from './student/project-archive.component';
	
	import { SupervisorProfileComponent } from './supervisor/supervisor-profile.component';
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
	import { CoordinatorProfileComponent } from './coordinator/coordinator-profile.component';
	import { DashboardComponent } from './student/dashboard.component';
	import { SysteamControlComponent } from './coordinator/systeam-control.component';

	const APP_ROUTES: Routes=[
	{path: '' ,component : LoginComponent},
	{path: 'forgetPasswword' ,component : ForgetPasswordComponent},
	{path: 'student' ,component : HeadComponent,
	children: [
	
	{
	      path: 'messages',
	      component:MessagesComponent ,
	      outlet: 'm'
	  },
	 
	    {
	          path: 'SubmitReport',
	          component:ReportsComponent ,
	          outlet: 'r'
	      },
	      {
	          path: 'conceptNote',
	          component:ConceptNoteComponent ,
	          outlet: 'c'
	      },
	      {
	          path: 'pastProjects',
	          component:ViewPastProjectsComponent ,
	          outlet: 'v'
	      },
	      {
	          path: 'viewSupervisors',
	          component:ViewSupervisorComponent ,
	          outlet: 'vi'
	      },
	      {
	          path: 'profile',
	          component:ProfileComponent ,
	          outlet: 'p'
	      },
	      {
	            path: 'projectArchive',
	            component:ProjectArchiveComponent ,
	            outlet: 'pa'
	        },

	      {
	            path: 'annaucement',
	            component:DashboardComponent ,
	            outlet: 'an'
	        }
	        	      
	      
	  ]

	},
	{path: 'supervisor' ,component : BarComponent,
	children: [
	
	{
	      path: 'projectArchive',
	      component:ProjectArchiveComponent ,
	      outlet: 'pa'
	  },
	  {
	          path: 'submittedReports',
	          component:SubmitedReportsComponent ,
	          outlet: 'sR'
	      },
	    {
	          path: 'mygroup',
	          component:MygroupComponent ,
	          outlet: 'mG'
	      },
	      {
	          path: 'received-concept',
	          component:ReceivedConceptComponent ,
	          outlet: 'rc'
	      }
	      ,
  	      {
          path: 'panel',
          component:PanelComponent ,
          outlet: 'p'
  	      }
  	      ,
  	      {
  	          path: 'messages',
  	          component:StdMessagesComponent ,
  	          outlet: 'm'
  	      },
  	      {
  	          path: 'profile',
  	          component:SupervisorProfileComponent ,
  	          outlet: 'sp'
  	      }
  	      
  	      
	    
	      
	  ]


	},
	 {path: 'coordinator' ,component : CordinatorHeadComponent,
	children: [
	
	{
	      path: 'view-submitedr-eport',
	      component:SubmitedReportsComponent ,
	      outlet: 'sb'
	  },
	  {
	          path: 'view-concept-note',
	          component:ViewConceptNoteComponent ,
	          outlet: 'vc'
	    }
	    ,
	  {
	          path: 'view-groups',
	          component:ViewGroupsComponent ,
	          outlet: 'vg'
	    },
	    

	    {
	            path: 'annaucement',
	            component:AnnaucementComponent ,
	            outlet: 'a'
	    },
	    {
	            path: 'assign-group',
	            component:AssignGroupComponent ,
	            outlet: 'asg'
	    }
	    ,
	    {
	            path: 'projectArchived',
	            component:ProjectArchiveComponent ,
	            outlet: 'pa'
	    }
	    ,

	    {
	            path: 'profile',
	            component:CoordinatorProfileComponent ,
	            outlet: 'cp'
	    }
	    ,

	    {
	            path: 'annaucement',
	            component:AnnaucementComponent,
	            outlet: 'ca'
	    }
	    ,

	    {
	            path: 'control',
	            component:SysteamControlComponent,
	            outlet: 'ct'
	    }


	      
	    
	    
  	      
	    
	      
	   ]


	}



	];
	export  const routing: ModuleWithProviders=RouterModule.forRoot(APP_ROUTES);

	 

