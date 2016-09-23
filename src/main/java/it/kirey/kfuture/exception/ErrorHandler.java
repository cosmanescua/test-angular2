package it.kirey.kfuture.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import it.kirey.kfuture.dao.ILoggerDao;
import it.kirey.kfuture.error.ErrorResource;
import it.kirey.kfuture.util.AppConstants;
import it.kirey.kfuture.util.ErrorConstants;
import it.kirey.kfuture.util.Utilities;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler{

	@Autowired
	private ILoggerDao loggerDao;
	
	/**
	 * Handler which handles ControllerException exceptions and returns response entity with error details
	 * @param ex
	 * @param req
	 * @return
	 */
	@ExceptionHandler(ControllerException.class)
	protected ResponseEntity<Object> handleControllerException(ControllerException ex, HttpServletRequest req){
		
		ErrorResource errorResponse = ex.getError();
		HttpStatus httpStatus = ex.getHttpReturnStatus();
		errorResponse.setInvokingURL(Utilities.getUrlFromRequest(req));
		
		if(ex instanceof RuntimeException)
			loggerDao.log((Throwable)ex, errorResponse.getInvokingURL());
				
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		//return handleExceptionInternal(ex, errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE, request);
		return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
	}
	

	//RunTimeException
	@ExceptionHandler(RuntimeException.class)
	protected ResponseEntity<Object> handleRuntimeException(Exception ex, HttpServletRequest req){
			
			ErrorResource errorResponse = new ErrorResource(ErrorConstants.RUNTIME_EXCEPTION, ErrorConstants.GENERAL_ERROR, ex );
			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			errorResponse.setInvokingURL(Utilities.getUrlFromRequest(req));
			errorResponse.setKeyMsg(ErrorConstants.GENERAL_ERROR);
			
			//Only RunTimeExceptions are saved into database
			loggerDao.log(ex, errorResponse.getInvokingURL());
						
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
		}
	
	//general exception
	/**
	 * Handler which handles all exceptions and returns response entity with error details
	 * @param ex
	 * @param req
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> handleGeneralException(Exception ex, HttpServletRequest req){
	
		ErrorResource errorResponse = new ErrorResource(ErrorConstants.EXCEPTION, ErrorConstants.GENERAL_ERROR, ex );
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		errorResponse.setInvokingURL(Utilities.getUrlFromRequest(req));
		errorResponse.setKeyMsg(ErrorConstants.GENERAL_ERROR);
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
	}
	
}

