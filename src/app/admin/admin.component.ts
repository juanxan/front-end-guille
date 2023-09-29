import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatSidenavModule,MatDrawerMode} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { BreakpointObserver } from "@angular/cdk/layout";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule,MatTreeNestedDataSource } from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';

import { fadeInOut } from 'src/app/shared/components/sidenav/helper';
import { SidenavComponent } from 'src/app/shared/components/sidenav/sidenav.component';
import { SideNavToggle } from '../shared/models/side-nav-toggle';
import { NavItemNode } from '../shared/models/sidenav-model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { navbarData } from '../shared/components/sidenav/sidenav-data';
import { HeaderAdminComponent } from '../shared/components/header-admin/header-admin.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidenavComponent,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    HeaderAdminComponent
  ],
  animations: [
    fadeInOut
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  navData: any[]=[];
  panels = ['First', 'Second', 'Third'];
  collapsed = true;
  screenWidth= 0;
  dataSource = new MatTreeNestedDataSource<NavItemNode>();
  treeControl = new NestedTreeControl<NavItemNode>((node) => node.children);
  constructor(
    private readonly authService: AuthService
    ){
      this.dataSource.data = navbarData;
  }
  
  private transformer = (node: NavItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      routeLink: node.routeLink,
      icon: node.icon,
      label: node.label,
      rol: node.rol,
      level: level,
    };
  };
  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  hasChild = (_: number, node: NavItemNode) => !!node.children;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  exitSesion(){
    this.authService.logout();
  }
  
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    // this.onToggleSideNav.emit({
    //   collapsed: this.collapsed,
    //   screenWidth: this.screenWidth
    // })
  }

  

  closeSidenav(): void{
    this.collapsed = false;
    // this.onToggleSideNav.emit({
    //   collapsed: this.collapsed,
    //   screenWidth: this.screenWidth
    // })
  }
}
