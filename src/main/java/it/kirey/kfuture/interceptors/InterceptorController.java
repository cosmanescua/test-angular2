package it.kirey.kfuture.interceptors;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;


public class InterceptorController  implements ThrowsAdvice {


	@Autowired
	private TaskExecutor loggerTaskExecutor;
	
	private HttpServletRequest request;
	
	
	/**
	 * Setter method initialized by Spring Framework.
	 */
	public void setLoggerTaskExecutor(TaskExecutor loggerTaskExecutor) {
		this.loggerTaskExecutor = loggerTaskExecutor;
	}
	
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable   
	{  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		request = ((org.springframework.web.context.request.ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		
		this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": ***Begin " + method.getName() + "()");
		Object value = null;
	   
	    try {
	        value = pjp.proceed(); 
	        this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": ***End " + method.getName() + "()");
	    } catch (Exception ex) {
	    	
	    	//this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": ***Exception when invoking URL: "+ Utilities.getUrlFromRequest(request));
	    	//System.out.println(ex.getCause().getStackTrace()[0].getClassName()); 
		    this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": ***Exception in: "+ ex.getStackTrace()[0].getClassName(), ex);

	    	throw ex;	
	    }
	    finally {
	    	
		}
	 
	   return value;
	} 
	
	public void printMessage(Class<?> targetClass, String message) {
		this.printMessage(targetClass, message, null);
	}
	
	public void printMessage(Class<?> targetClass, String message, Throwable ex) {
		Log logger = LogFactory.getLog(targetClass);
		String username = null;
		try {
			SecurityContext securityContext = SecurityContextHolder.getContext();
			username = securityContext.getAuthentication().getName();
		} catch (Exception e) {
			username = null;
		}
		this.loggerTaskExecutor.execute(new LoggerTask(logger, message, username, ex));
	}
	
	private class LoggerTask implements Runnable {

		private String message = null;
		private Log logger = null;
		private Throwable ex = null;

		public LoggerTask(Log logger, String message, String username, Throwable ex) {
			this.logger = logger;
			if (username!=null) {
				this.message = message;
			} else {
				this.message = message + " - User: " + username;
			}
			this.ex = ex;
		}

		public void run() {
			if (this.ex != null) {
				this.logger.error(this.message, this.ex);
			} else {
				if (this.logger.isInfoEnabled()) {
					this.logger.info(this.message);
				}
			}
		}
	}
	
}
