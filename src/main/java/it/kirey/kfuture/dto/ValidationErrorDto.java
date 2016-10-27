package it.kirey.kfuture.dto;

import java.util.HashMap;

public class ValidationErrorDto {

	private String formName;
	private HashMap<String,	String> fields;
	
	public String getFormName() {
		return formName;
	}
	
	public void setFormName(String formName) {
		this.formName = formName;
	}
	
	public HashMap<String, String> getFields() {
		return fields;
	}
	
	public void setFields(HashMap<String,String> fields) {
		this.fields = fields;
	}
	
}
