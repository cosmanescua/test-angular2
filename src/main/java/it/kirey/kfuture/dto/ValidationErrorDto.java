package it.kirey.kfuture.dto;

import java.util.HashMap;

public class ValidationErrorDto {

	private String formName;
	private HashMap<Object,	Object> fields;
	
	public String getFormName() {
		return formName;
	}
	
	public void setFormName(String formName) {
		this.formName = formName;
	}
	
	public HashMap<Object, Object> getFields() {
		return fields;
	}
	
	public void setFields(HashMap<Object, Object> fields) {
		this.fields = fields;
	}
	
}
