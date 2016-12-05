// Import the core angular services.
import { Component, ContentChild, ContentChildren, EventEmitter, TemplateRef, QueryList, Input, forwardRef, Directive} from "@angular/core";
import { ChangeDetectionStrategy, ViewContainerRef, ChangeDetectorRef, ViewChildren, ComponentResolver, ComponentRef} from '@angular/core'
import {List, Map} from 'immutable'
@Component({
  selector: "basic-cell",
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasicCellC {
  @Input() row: Map<any, any>;
  @Input() cell: string;
  @ContentChild(TemplateRef)
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
            <li ng-class="{disabled:pager.currentPage === 1}">
              <a (click)="setPage(1)">First</a>
            </li>
            <li ng-class="{disabled:pager.currentPage === 1}">
              <a (click)="setPage(pager.currentPage - 1)">Previous</a>
            </li>
            <li *ngFor="let page of pager.pages" ng-class="{active:pager.currentPage === page}">
              <a (click)="setPage(page)">{{page}}</a>
            </li>                
            <li ng-class="{disabled:pager.currentPage === pager.totalPages}">
              <a (click)="setPage(pager.currentPage + 1)">Next</a>
            </li>
            <li ng-class="{disabled:pager.currentPage === pager.totalPages}">                
              <a (click)="setPage(pager.totalPages)">Last</a>
            </li>
          </ul>
        </div>
      </div>
      <table class="head">
        <tr>
          <th *ngFor='let cell of cells' >
            {{cell.cell}}
          </th>
        </tr>
      </table>
      <div class="inner_table" id='aa' onscroll='console.log(document.getElementById("aa"))'>
        <table *ngIf=' source && cells && currentPage'>
          <tr *ngFor='let rowData of currentPage'>
            <td *ngFor='let cell of cells'>
              <span *ngIf='!cell.template'>
                {{rowData[cell.cell]}}
              </span>
              <template *ngIf='cell.template'
                [ngTemplateOutlet]="cell.template"
                [ngOutletContext]="{ row: rowData }">
              </template>
            </td>
          </tr>
        </table>
        <div *ngIf="gridPagination=='buttom' || gridPagination=='both'">
          <div *ngIf="donePage">
            <select [(ngModel)]="pageData" name="pageData" (change)="setPage('dropdownChange',$event.target.value)">
              <option value=20>20</option>
              <option value=50>50</option>
              <option value=100>100</option>
            </select>
          </div>
          <div *ngIf="donePage">
            <ul class="pagination">
              <li ng-class="{disabled:pager.currentPage === 1}">
                <a (click)="setPage(1)">First</a>
              </li>
              <li ng-class="{disabled:pager.currentPage === 1}">
                <a (click)="setPage(pager.currentPage - 1)">Previous</a>
              </li>
              <li *ngFor="let page of pager.pages" ng-class="{active:pager.currentPage === page}">
                <a (click)="setPage(page)">{{page}}</a>
              </li>                
              <li ng-class="{disabled:pager.currentPage === pager.totalPages}">
                <a (click)="setPage(pager.currentPage + 1)">Next</a>
              </li>
              <li ng-class="{disabled:pager.currentPage === pager.totalPages}">                
                <a (click)="setPage(pager.totalPages)">Last</a>
              </li>
            </ul>
          </div>
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
    table-layout: fixed;
}
table tr td {
    padding: 5px;
    border: 1px solid #eee;
    width: 100px;
    word-wrap: break-word;
}
table.head tr td {
    background: #eee;
}
.inner_table {
    height: 500px;
    overflow-y: auto;
    overflow-x:hidden;
}`],
  directives: [BasicCellC],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasicGrid {
  @Input() source: any;
  @Input() gridPagination: any;
  @Input() private currentPage: List<any>;
  pager: any;
  items: any;
  donePage: any = false;
  pageData: any = 20;
  constructor(private viewContainerRef: ViewContainerRef, private componentResolver: ComponentResolver) {
  }

  @ContentChildren(BasicCellC) cells: QueryList<BasicCellC>;
  ngAfterViewInit() {

  }

  ngOnChanges(a) {
    if (this.source) {
      if (this.gridPagination) {
        this.pagination();
      }
      else {
        this.currentPage = this.source;
      }
    }
  }

  pagination() {
    this.pager = {};
    this.setPage(1, '');
  }

  setPage(page, val) {
    if (val) {
      page = 1;
      this.pageData = val;
    }
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.GetPager(this.source.length, page, +this.pageData);

    // get current page of items
    this.currentPage = this.source.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.donePage = true;
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