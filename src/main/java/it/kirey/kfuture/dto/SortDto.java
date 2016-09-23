package it.kirey.kfuture.dto;

import java.io.Serializable;

public class SortDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2034981770151736019L;

	private String field;
	private String type;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
