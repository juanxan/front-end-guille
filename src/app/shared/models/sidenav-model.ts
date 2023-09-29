export interface NavItemNode {
    routeLink: string;
    icon: string;
    label: string;
    rol: string[];
    children?: NavItemNode[];
  }
  
export interface NavItemFlatNode {
    expandable: boolean;
    routeLink: string;
    icon: string;
    label: string;
    rol: string[];
    level: number;
  }
