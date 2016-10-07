package it.kirey.kfuture.exception;

import it.kirey.kfuture.dto.ValidationErrorDto;

public class ValidationFormException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	private ValidationErrorDto validationDto;
	
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
