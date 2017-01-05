// Import the core angular services.
import { Component, ContentChild, ContentChildren, EventEmitter, TemplateRef, QueryList, Input, forwardRef, Directive } from "@angular/core";
import { ChangeDetectionStrategy, ViewContainerRef, ChangeDetectorRef, ViewChildren, ComponentRef } from '@angular/core'
import { List, Map } from 'immutable'
@Component({
  selector: "basic-cell",
  template: ``,
  changeDetection: ChangeDetectionStrategy.Default
})

export class BasicCellC {
  @Input() row: Map<any, any>;
  @Input() cell: string;
  @Input() headerLabel: string;
  @ContentChild("bg")
  template: TemplateRef<any>
  ngAfterViewInit() {
    // console.log(this.template);
  }
}

@Component({
  selector: "basic-grid",
  template: `<div>
    <div class="wrap">
      <div *ngIf="gridPagination=='top' || gridPagination=='both'">
        <div *ngIf="donePage">
          <select [(ngModel)]="pageData" name="pageData" (change)="setPage('dropdownChange',$event.target.value)">
            <option value=20>20</option>
            <option value=50>50</option>
            <option value=100>100</option>
          </select>
        </div>
        <div *ngIf="donePage">
          <ul class="pagination">
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(1)"><i class="fa fa-angle-double-left" title="First"></i></a>
            </li>
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(pager.currentPage - 1)"><i class="material-icons" title="Previous">chevron_left</i></a>
            </li>
            <li *ngFor="let page of pager.pages" class="waves-effect" [class.active]="pager.currentPage == page">
              <a (click)="setPage(page)">{{page}}</a>
            </li>                
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.currentPage + 1)"><i class="material-icons" title="Next">chevron_right</i></a>
            </li>
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.totalPages)"><i class="fa fa-angle-double-right" title="Last"></i></a>
            </li>
          </ul>
        </div>
      </div>
       <div [class.table-responsive]="gridOptions.isHorizontalScroll" >    
      <div *ngIf='isHeaderVisible'>
        <table class="head responsive-table">
          <thead>
            <tr>
              <th *ngFor='let headerLabel of headerLabels let i=index' [style.width]='gridOptions?gridOptions.colWidths[i]+gridOptions.widthType:""'>
                {{headerLabel.headerLabel}}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="inner_table" id='aa' onscroll='console.log(document.getElementById("aa"))'>

        <table *ngIf=' source && cells && currentPage' class='striped responsive-table scroll' [class.scroll]="gridOptions.useScroll">
        <tbody>
          <tr *ngFor='let rowData of currentPage'>
            <td *ngFor='let cell of cells; let i=index' [style.width]='gridOptions?gridOptions.colWidths[i]+gridOptions.widthType:""' >
              <span *ngIf='!cell.template'>
                {{rowData[cell.cell]}}
              </span>
              <template *ngIf='cell.template'
                [ngTemplateOutlet]="cell.template"
                [ngOutletContext]="{ row: rowData }">
              </template>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>      
      <div *ngIf="gridPagination=='bottom' || gridPagination=='both'" class="row">
        <div *ngIf="donePage" class="col s12 m-top10">
          <div class="row margin-zero">
            <div class="col s12 l2 offset-l10">
              <select [(ngModel)]="pageData" name="pageData" (change)="setPage('dropdownChange',$event.target.value)">
                <option value=20>20</option>
                <option value=50>50</option>
                <option value=100>100</option>
              </select>
            </div>
          </div>
        </div>
        <div *ngIf="donePage" class="col s12 right-align">
          <ul class="pagination">
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(1)"><i class="fa fa-angle-double-left" title="First"></i></a>
            </li>
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(pager.currentPage - 1)"><i class="material-icons" title="Previous">chevron_left</i></a>
            </li>
            <li *ngFor="let page of pager.pages" class="waves-effect" [class.active]="pager.currentPage == page">
              <a (click)="setPage(page)">{{page}}</a>
            </li>                
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.currentPage + 1)"><i class="material-icons" title="Next">chevron_right</i></a>
            </li>
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.totalPages)"><i class="fa fa-angle-double-right" title="Last"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ng-content *ngIf='1==2'></ng-content>
      `,
  styles: [`.wrap {
    width: 100%;
}
.wrap table {
    width: 100%;
    table-layout: auto
    }
.pagination li {
    display: inline-block;
    font-size: 1.2rem;
    padding: 0 10px;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
}
.pagination li.active {
    background-color: #2d81af;
}
.pagination li.disabled {
    cursor: default;
    color: #999;
    pointer-events: none;
}
select{
  display: block;
}
[hidden] {
   display: none !important;    
}]`],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasicGrid {
  @Input() source: any;
  @Input() gridPagination: any;
  @Input() private currentPage: List<any>;
  @Input() gridOptions: any = { colWidths: [], widthType: "px", useScroll: true, isHorizontalScroll: true }
  @Input() isHeaderVisible: boolean = true;
  pager: any;
  items: any;
  donePage: boolean = false;
  pageData: number = 20;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (typeof (this.gridOptions) == 'string')
      this.gridOptions = JSON.parse(this.gridOptions);
    this.SetDefaultGridOptions();
  }

  @ContentChildren(BasicCellC) cells: QueryList<BasicCellC>;
  @ContentChildren(BasicCellC) headerLabels: QueryList<BasicCellC>;

  ngOnChanges(a) {
    this.pagination();
  }

  pagination() {
    if (this.source) {
      if (this.gridPagination) {
        this.pager = {};
        this.setPage(1, '');
      }
      else {
        this.currentPage = this.source;
      }
    }
  }

  SetDefaultGridOptions() {
    //  console.log("called");
    if (!this.gridOptions) {
      this.gridOptions = {
        widthType: "%",
        useScroll: true,
        isHorizontalScroll: true,
        colWidths: () => {
          var equalwidth = 100 / this.cells.length;
          let widthArr: any = [];
          for (var i = 0; i < this.cells.length; i++)
            widthArr.push(equalwidth);
          return widthArr;
        }
      }
    }
  }


  setPage(page, val) {
    if (val) {
      page = 1;
      this.pageData = +val;
    }
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.GetPager(this.source.length, page, this.pageData);

    // get current page of items
    this.currentPage = this.source.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.pageData < this.source.length) {
      this.donePage = true;
    }
  }

  GetPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [];
    for (var i = startPage; i < (endPage + 1); i++) {
      pages.push(i);
    }

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}




// Import the core angular services.

@Component({
  selector: "basic-cell1",
  template: ``,
  changeDetection: ChangeDetectionStrategy.Default
})

export class BasicCellC1 {
  @Input() row: Map<any, any>;
  @Input() cell: string;
  @Input() headerLabel: string;
  @ContentChild("bg1")
  template: TemplateRef<any>
  ngAfterViewInit() {
    // console.log(this.template);
  }
}

@Component({
  selector: "basic-grid1",
  template: `<div>
    <div class="wrap">
      <div *ngIf="gridPagination=='top' || gridPagination=='both'">
        <div *ngIf="donePage">
          <select [(ngModel)]="pageData" name="pageData" (change)="setPage('dropdownChange',$event.target.value)">
            <option value=20>20</option>
            <option value=50>50</option>
            <option value=100>100</option>
          </select>
        </div>
        <div *ngIf="donePage">
          <ul class="pagination">
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(1)"><i class="fa fa-angle-double-left" title="First"></i></a>
            </li>
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(pager.currentPage - 1)"><i class="material-icons" title="Previous">chevron_left</i></a>
            </li>
            <li *ngFor="let page of pager.pages" class="waves-effect" [class.active]="pager.currentPage == page">
              <a (click)="setPage(page)">{{page}}</a>
            </li>                
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.currentPage + 1)"><i class="material-icons" title="Next">chevron_right</i></a>
            </li>
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.totalPages)"><i class="fa fa-angle-double-right" title="Last"></i></a>
            </li>
          </ul>
        </div>
      </div>
       <div [class.table-responsive]="gridOptions.isHorizontalScroll" >    
      <div *ngIf='isHeaderVisible'>
        <table class="head responsive-table">
          <thead>
            <tr>
              <th *ngFor='let headerLabel of headerLabels let i=index' [style.width]='gridOptions?gridOptions.colWidths[i]+gridOptions.widthType:""'>
                {{headerLabel.headerLabel}}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="inner_table" id='aa' onscroll='console.log(document.getElementById("aa"))'>

        <table *ngIf=' source && cells && currentPage' class='striped responsive-table scroll' [class.scroll]="gridOptions.useScroll">
        <tbody>
          <tr *ngFor='let rowData of currentPage'>
            <td *ngFor='let cell of cells; let i=index' [style.width]='gridOptions?gridOptions.colWidths[i]+gridOptions.widthType:""' >
              <span *ngIf='!cell.template'>
                {{rowData[cell.cell]}}
              </span>
              <template *ngIf='cell.template'
                [ngTemplateOutlet]="cell.template"
                [ngOutletContext]="{ row: rowData }">
              </template>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>      
      <div *ngIf="gridPagination=='bottom' || gridPagination=='both'" class="row">
        <div *ngIf="donePage" class="col s12 m-top10">
          <div class="row margin-zero">
            <div class="col s12 l2 offset-l10">
              <select [(ngModel)]="pageData" name="pageData" (change)="setPage('dropdownChange',$event.target.value)">
                <option value=20>20</option>
                <option value=50>50</option>
                <option value=100>100</option>
              </select>
            </div>
          </div>
        </div>
        <div *ngIf="donePage" class="col s12 right-align">
          <ul class="pagination">
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(1)"><i class="fa fa-angle-double-left" title="First"></i></a>
            </li>
            <li [class.disabled]="pager.currentPage == 1" class="waves-effect">
              <a (click)="setPage(pager.currentPage - 1)"><i class="material-icons" title="Previous">chevron_left</i></a>
            </li>
            <li *ngFor="let page of pager.pages" class="waves-effect" [class.active]="pager.currentPage == page">
              <a (click)="setPage(page)">{{page}}</a>
            </li>                
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.currentPage + 1)"><i class="material-icons" title="Next">chevron_right</i></a>
            </li>
            <li [class.disabled]="pager.currentPage == pager.totalPages" class="waves-effect">
              <a (click)="setPage(pager.totalPages)"><i class="fa fa-angle-double-right" title="Last"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ng-content *ngIf='1==2'></ng-content>
      `,
  styles: [`.wrap {
    width: 100%;
}
.wrap table {
    width: 100%;
    table-layout: auto
    }
.pagination li {
    display: inline-block;
    font-size: 1.2rem;
    padding: 0 10px;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
}
.pagination li.active {
    background-color: #2d81af;
}
.pagination li.disabled {
    cursor: default;
    color: #999;
    pointer-events: none;
}
select{
  display: block;
}
[hidden] {
   display: none !important;    
}]`],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasicGrid1 {
  @Input() source: any;
  @Input() gridPagination: any;
  @Input() private currentPage: List<any>;
  @Input() gridOptions: any = { colWidths: [], widthType: "px", useScroll: true, isHorizontalScroll: true }
  @Input() isHeaderVisible: boolean = true;
  pager: any;
  items: any;
  donePage: boolean = false;
  pageData: number = 20;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (typeof (this.gridOptions) == 'string')
      this.gridOptions = JSON.parse(this.gridOptions);
    this.SetDefaultGridOptions();
  }

  @ContentChildren(BasicCellC) cells: QueryList<BasicCellC>;
  @ContentChildren(BasicCellC) headerLabels: QueryList<BasicCellC>;

  ngOnChanges(a) {
    this.pagination();
  }

  pagination() {
    if (this.source) {
      if (this.gridPagination) {
        this.pager = {};
        this.setPage(1, '');
      }
      else {
        this.currentPage = this.source;
      }
    }
  }

  SetDefaultGridOptions() {
    //  console.log("called");
    if (!this.gridOptions) {
      this.gridOptions = {
        widthType: "%",
        useScroll: true,
        isHorizontalScroll: true,
        colWidths: () => {
          var equalwidth = 100 / this.cells.length;
          let widthArr: any = [];
          for (var i = 0; i < this.cells.length; i++)
            widthArr.push(equalwidth);
          return widthArr;
        }
      }
    }
  }


  setPage(page, val) {
    if (val) {
      page = 1;
      this.pageData = +val;
    }
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.GetPager(this.source.length, page, this.pageData);

    // get current page of items
    this.currentPage = this.source.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (this.pageData < this.source.length) {
      this.donePage = true;
    }
  }

  GetPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [];
    for (var i = startPage; i < (endPage + 1); i++) {
      pages.push(i);
    }

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}