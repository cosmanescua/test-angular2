package it.kirey.kfuture.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PaginationDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2230120664086113320L;

	private String tableName;
	private int page;
	private int pageSize;
	private SortDto sort;
	private List<FilterDto> filterList;

	public PaginationDto() {
		this.filterList = new ArrayList<FilterDto>();
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public SortDto getSort() {
		return sort;
	}

	public void setSort(SortDto sort) {
		this.sort = sort;
	}

	public List<FilterDto> getFilterList() {
		return filterList;
	}

	public void setFilterList(List<FilterDto> filterList) {
		this.filterList = filterList;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

}
