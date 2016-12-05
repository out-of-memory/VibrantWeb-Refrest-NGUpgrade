export class UIGridDataSource {
	public GridRows : Array<any>;
	public GridColumns :  Array<any>;
	
		constructor(gridRows :Array<any>,gridColumns:Array<any>)
	{
		this.GridRows = gridRows;
		this.GridColumns = gridColumns;
	}
}