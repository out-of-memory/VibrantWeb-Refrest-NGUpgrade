import { Component, OnInit,AfterContentInit, Input} from '@angular/core';
import {UIGridSorter} from '../../infrastructure/components/UIGridSorter';
import {UIGridConfig} from  '../../infrastructure/components/UIGridConfig.component';
import {UIGridDataSource} from  '../../infrastructure/components/UIGridDataSource';
import {UIGridColumn} from  '../../infrastructure/components/UiGridColumn.component';


@Component({
	selector: 'ui-grid',
	templateUrl: '../../app/infrastructure/components/UIGrid.component.html',
	styleUrls: ['../../app/infrastructure/Css/UIGrid.component.css']
})

export class UIGrid implements OnInit, AfterContentInit {
	@Input() public gridDataSource: UIGridDataSource;
	@Input() public gridConfig: UIGridConfig;
	@Input() public rows:  Array<any>;
	
	uiGridConfig: UIGridConfig;
	sorter: UIGridSorter;
	sortType: string
	gridColumns: Array<any> = [];
	gridRows: Array<any> = [];
	public manualGridColumns: Array<any>;

	constructor() {
		this.manualGridColumns = new Array<any>();
	}

	ngOnInit() {
		this.gridRows = this.gridDataSource.GridRows;
		this.uiGridConfig = this.gridConfig;
		this.sorter = new UIGridSorter();
		this.SetDefaultConfig();
		
	}

	ngAfterContentInit() {
		if (this.uiGridConfig.AutoGenerated == true)
			this.ExtractColumnsFromHub(this.gridDataSource.GridColumns);
		else
			this.ExtractColumnsFromHub(this.manualGridColumns);
	}

	addManualGridColumns(manualColumns: Object) {
		this.manualGridColumns.push(manualColumns);
	}

	SetDefaultConfig() {
		if (this.uiGridConfig != undefined)
			this.uiGridConfig.DefaultSortColumn == '' ? this.gridDataSource.GridColumns[0].name : this.uiGridConfig.DefaultSortColumn;
		else
			this.uiGridConfig = new UIGridConfig(true, GridSortOrders.Ascending, this.gridDataSource.GridColumns[0].name, true,true);
	}

	ExtractColumnsFromHub(cols: Array<any>) {
		this.ConfigureGridBasedOnConfig(cols);
	}

	getData(row: any, propertyName: string): string {
		return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
	}

	sort(key, firstLoad) {
		this.sortType = key;
		this.SetSortOrderForColumns(key, firstLoad);
		this.sorter.sort(key, this.gridRows);
	}

	SetSortOrderForColumns(key, firstLoad) {
		if (!firstLoad) {
			for (let i = 0; i < this.gridColumns.length; i++) {
				if (this.gridColumns[i].name == key) {
					if (this.gridColumns[i].sort == 1 || this.gridColumns[i].sort == 2) {
						this.gridColumns[i].sort = 0;
					}
					else if (this.gridColumns[i].sort == 0) {
						this.gridColumns[i].sort = 1;
					}
				}
			}
		}
	}

	ConfigureGridBasedOnConfig(cols: Array<any>) {
		this.gridColumns = new Array<any>();
		if (this.uiGridConfig.SortingEnabled) {
			for (let i = 0; i < cols.length; i++) {
				if (cols[i].name == this.uiGridConfig.DefaultSortColumn)
					this.gridColumns.push({ "name": cols[i].name, "label": cols[i].label, "sort": this.uiGridConfig.DefaultSortType });
				else
					this.gridColumns.push({ "name": cols[i].name, "label": cols[i].label, "sort": GridSortOrders.None });
			}
			this.sort(this.uiGridConfig.DefaultSortColumn, true);
		} else {
			for (let i = 0; i < cols.length; i++)
				this.gridColumns.push({ "name": cols[i].name, "label": cols[i].label });
		}
	}
}


export enum GridSortOrders {
    Ascending,
    Descending,
    None
}



