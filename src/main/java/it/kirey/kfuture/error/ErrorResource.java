package it.kirey.kfuture.error;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import it.kirey.kfuture.util.AppConstants;
import it.kirey.kfuture.util.ErrorConstants;

/**
 * ErrorResource represents JSON object which is used when response is returned to user when an exception occurred.
 *  It holds details about error which was handled
 * @author kitanoskan
 *
 */
public class ErrorResource {
	
	private String type;
	private String invokingURL;    
    private String errorName;
    private String detail;
    private String message;

    public ErrorResource() { }
    
    public ErrorResource(String type, String keyMsg, Exception ex)
    {
    	 this.type = type;
         this.message = keyMsg; //TODO proveriti ovo da bude us kladu sa internacionalizacijom i categorijom
    	 this.errorName = ex.toString();
    	 if(ex.getMessage() != null)
         	this.detail = (detail.equals(errorName)?null:ex.getMessage());
         else this.detail = ErrorConstants.NO_MSG_DETAILS;
    }

//    public ErrorResource(String type, String message, String detail) {
//    	
////    	HttpServletRequest requestedUrl = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
////		
////		String invokingUrl= null;
////		if(requestedUrl.getQueryString()!=null)
////			this.invokingURL = requestedUrl.getRequestURL().toString() + "?" + requestedUrl.getQueryString();
////		else this.invokingURL = requestedUrl.getRequestURL().toString();
////		
//        this.type = type;
//        this.errorName = message;
//        if(detail != null)
//        	this.detail = (detail.equals(message)?null:detail);
//        else this.detail = ErrorConstants.NO_MSG_DETAILS;
//    }

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getErrorName() {
		return errorName;
	}

	public void setErrorName(String errorName) {
		this.errorName = errorName;
	}

	public String getInvokingURL() {
		return invokingURL;
	}

	public void setInvokingURL(String invokingURL) {
		this.invokingURL = invokingURL;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

    
}