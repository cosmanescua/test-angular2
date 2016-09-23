package it.kirey.kfuture.dto;

import java.io.Serializable;

public class FilterDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6305694156488695167L;

	private String field;
	private Object query;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public Object getQuery() {
		return query;
	}

	public void setQuery(Object query) {
		this.query = query;
	}

}
