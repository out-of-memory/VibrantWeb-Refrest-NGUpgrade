
import {GridSortOrders} from  '../../infrastructure/components/UiGrid.component';
export class UIGridConfig {
	public SortingEnabled : boolean;
	public DefaultSortType : GridSortOrders;
	public DefaultSortColumn : string;
	public RequireHeader : boolean; 
	public AutoGenerated : boolean;
	constructor(sortingEnabled :boolean,defaultSortType:GridSortOrders,defaultSortColumn :string,requireHeader :boolean,autoGenerated :boolean)
	{
		this.SortingEnabled = sortingEnabled;
		this.DefaultSortType = defaultSortType;
		this.DefaultSortColumn = defaultSortColumn;
		this.RequireHeader = requireHeader;
		this.AutoGenerated = autoGenerated;
	}
}