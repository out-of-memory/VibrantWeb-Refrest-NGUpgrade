import { Component, OnInit, Input} from '@angular/core';
import {UIGrid} from  '../../infrastructure/components/UiGrid.component';

@Component({
	selector: 'grid-column',
	template: `<div></div>`
	
})

export class UIGridColumn implements OnInit {
	@Input()
	set title(title: string) {
		this.columnTitle = (title && title.trim()) || '<no name set>';
	}
	get title() { return this.columnTitle; }

	@Input()
	set name(name: string) {
		this.columnName = (name && name.trim()) || '<no name set>';
	}
	get name() { return this.columnName; }
	
    private columnName: string;
	private columnTitle: string;
	
	constructor(private uiGrid: UIGrid) {  }

	ngOnInit() {
		let column :any;
		column = { "name": this.columnName, "label": this.columnTitle};
		this.uiGrid.addManualGridColumns(column);
	}


}