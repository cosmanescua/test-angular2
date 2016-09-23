package it.kirey.kfuture.exception;

import org.springframework.http.HttpStatus;
import it.kirey.kfuture.error.ErrorResource;
import it.kirey.kfuture.util.ErrorConstants;

/**
 * Custom RuntimeException 
 * @author kitanoskan
 *
 */
public class ControllerException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private ErrorResource error;
	
	private HttpStatus httpReturnStatus;

	public ControllerException() {}
	
	public ControllerException(String messageKey, Throwable t, HttpStatus status) {
		super(messageKey, t);
		this.httpReturnStatus = status;
		error = new ErrorResource(ErrorConstants.EXCEPTION, messageKey, (Exception) t);
	}
	
	public ErrorResource getError() {
		return error;
	}

	public void setError(ErrorResource error) {
		this.error = error;
	}

	public HttpStatus getHttpReturnStatus() {
		return httpReturnStatus;
	}
	
}
