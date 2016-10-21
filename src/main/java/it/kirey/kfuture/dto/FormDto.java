package it.kirey.kfuture.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class FormDto {

	@NotNull
    @Size(min=2, max=20)
	private String formName;

	@Valid
	private TestObject fields;
	
	public String getFormName() {
		return formName;
	}
	public void setFormName(String formName) {
		this.formName = formName;
	}
	public TestObject getFields() {
		return fields;
	}
	public void setFields(TestObject fields) {
		this.fields = fields;
	}
		
}
