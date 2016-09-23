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

import it.kirey.kfuture.util.Utilities;
import org.springframework.web.context.request.*;

import it.kirey.kfuture.dao.ILoggerDao;

public class InterceptorLogging implements ThrowsAdvice { 
	
	/*@Autowired
	private ILoggerDao loggerDao;*/
	
	@Autowired
	private TaskExecutor loggerTaskExecutor;
	
	private HttpServletRequest request;
	
	/**
	 * Setter method initialized by Spring Framework.
	 */
	public void setLoggerTaskExecutor(TaskExecutor loggerTaskExecutor) {
		this.loggerTaskExecutor = loggerTaskExecutor;
	}
	
	//executed after each intercepted method no matter if it is thrown exception or method is executed correctly
//	public void after(JoinPoint joinPoint) throws RuntimeException
//	{
//		this.printMessage(joinPoint.getClass(), "End " + joinPoint.getSignature().getName() + "()");
//	}

	/**
	 * aroundMethod is used to intercept method before execution(print message Begin to console), 
	 * after method execution if everything is ok (print message End to console)
	 * and intercept method after throwing an error (print message trace to console)
	 * @param pjp
	 * @return
	 * @throws RuntimeException
	 */
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable   
	{  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		request = ((org.springframework.web.context.request.ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		
		this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Begin " + method.getName() + "()");
		Object value = null;
	   
	    try {
	        value = pjp.proceed(); 
	        this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": End " + method.getName() + "()");
	    } catch (Exception ex) {
	    	
	    	//this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Exception when invoking URL: "+ Utilities.getUrlFromRequest(request));
		  //  this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Exception in " + method.getName() + "()", ex);
//		    loggerDao.log(ex, request);

	    	throw ex;	
	    }
	    finally {
	    	//this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": End " + method.getName() + "()");
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
	
	/**
	 * Printing to console is done in a separate thread
	 * @author kitanoskan
	 *
	 */
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
