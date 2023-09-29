import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, EventEmitter, Output,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';

import {MatSidenavModule,MatDrawerMode} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { BreakpointObserver } from "@angular/cdk/layout";
import { fadeInOut } from 'src/app/shared/components/sidenav/helper';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule,MatTreeNestedDataSource } from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import { navbarData } from './sidenav-data';
import { NavItemFlatNode, NavItemNode } from 'src/app/shared/models/sidenav-model';
import { SideNavToggle } from 'src/app/shared/models/side-nav-toggle';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    MatTreeModule,
    MatButtonModule
  ],
  animations: [
    fadeInOut
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy{
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Output() eventCloseModal= new EventEmitter<boolean>();
  navData: any[]=[];
  panels = ['First', 'Second', 'Third'];
  collapsed = false;
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

  ngOnDestroy(): void {
    this.eventCloseModal.unsubscribe();
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  exitSesion(){
    this.authService.logout();
  }
  
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    })
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth
    })
  }



}
