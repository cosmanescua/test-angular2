package it.kirey.kfuture.exception;

import java.util.HashMap;
import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import it.kirey.kfuture.dto.ValidationErrorDto;

public class ValidationFormException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	private ValidationErrorDto validationDto;
		
	public ValidationFormException(BindingResult validationResult, String formName) {
		validationDto = new ValidationErrorDto();
		HashMap<String, String> errorFields = new HashMap<String, String>();
		List<ObjectError> errors = validationResult.getAllErrors();
		for (ObjectError objectError : errors) {
			String fieldName = ((FieldError) objectError).getField().replace("fields.", "");
			errorFields.put(fieldName, objectError.getDefaultMessage());
		}
		validationDto.setFormName(formName);
		validationDto.setFields(errorFields);
	}
	
	public ValidationFormException(String message) {
	        super(message);
	        validationDto = new ValidationErrorDto();
	}

	public ValidationErrorDto getValidationDto() {
		return validationDto;
	}

	public void setValidationDto(ValidationErrorDto validationDto) {
		this.validationDto = validationDto;
	}
	
}
