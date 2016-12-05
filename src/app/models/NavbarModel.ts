export class NavbarModel {        
    name: string;
    title: string;
    pageUrl: string;
    imageUrl: string;
    iconCss: string;
    color: string;
    css: string;
    isActive: boolean;
    parentRoute: string;
    IsPageLevelSubMenu: boolean;
    useAsDefault: boolean;
    subNav: NavbarModel[];
    count: string;

    routerName: string;
    routerPara: any;
}