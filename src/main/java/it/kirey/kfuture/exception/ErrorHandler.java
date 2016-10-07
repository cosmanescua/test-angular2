package it.kirey.kfuture.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import it.kirey.kfuture.error.ErrorResource;
import it.kirey.kfuture.service.ILoggerService;
import it.kirey.kfuture.util.ErrorConstants;
import it.kirey.kfuture.util.PrintingToConsole;
import it.kirey.kfuture.util.Translation;
import it.kirey.kfuture.util.Utilities;

@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler{

	@Autowired
	private ILoggerService loggerService;

	@Autowired
	private PrintingToConsole printer;
	
	@Autowired
	private Translation translator;
	
	//RunTimeException
	@ExceptionHandler(RuntimeException.class)
	protected ResponseEntity<Object> handleRuntimeException(Exception ex, HttpServletRequest req){
			
			ErrorResource errorResponse = new ErrorResource(ErrorConstants.RUNTIME_EXCEPTION, ErrorConstants.GENERAL_ERROR_KEY, ex );
			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			errorResponse.setInvokingURL(Utilities.getUrlFromRequest(req));
					
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.add("Accept-Charset","utf-8");
			
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_INVOKING_URL + Utilities.getUrlFromRequest(req));
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_IN + ex.getStackTrace()[0].getClassName()+ ":" + ex.getStackTrace()[0].getMethodName(), ex);
			
			//Only RunTimeExceptions are saved into database
			try{
				loggerService.log(ex, errorResponse.getInvokingURL());
			}
			//in case of error when saving in DB 
			catch(Exception exception){
				printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, exception);
				errorResponse.setDetail(ErrorConstants.ERROR_SAVING_LOG);
				return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
			}
			 
			String translationOfError = translator.translateErrorMessage(errorResponse);
			if(translationOfError!=null)
				return new ResponseEntity<Object>(translationOfError, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
			else
			{
				printer.printMessage(this.getClass(),"Error translating...");
				return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
			}		
	}
	
	//general exception
	/**
	 * Handler which handles all exceptions and returns response entity with error details
	 * @param ex
	 * @param req
	 * @return
	 */

	//General exception

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> handleGeneralException(Exception ex, HttpServletRequest req){
	
		ErrorResource errorResponse = new ErrorResource(ErrorConstants.EXCEPTION, ErrorConstants.GENERAL_ERROR_KEY, ex );
		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		errorResponse.setInvokingURL(Utilities.getUrlFromRequest(req));
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		String translationOfError = translator.translateErrorMessage(errorResponse);
		if(translationOfError!=null)
			return new ResponseEntity<Object>(translationOfError, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
		else
		{
			printer.printMessage(this.getClass(),"Error translating...");
			return new ResponseEntity<Object>(errorResponse, headers, httpStatus != null ? httpStatus:HttpStatus.SERVICE_UNAVAILABLE); 
		}	
	}
	
}

