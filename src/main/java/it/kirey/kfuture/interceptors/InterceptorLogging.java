package it.kirey.kfuture.interceptors;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;

import it.kirey.kfuture.util.PrintingToConsole;

public class InterceptorLogging implements ThrowsAdvice { 
	
	@Autowired
	private PrintingToConsole printer;
		
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
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable {  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Begin " + method.getName() + "()");
		Object value = null;
	   
	    try {
	        value = pjp.proceed(); 
	        printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": End " + method.getName() + "()");
	    } catch (Exception ex) {
	    	
	    	//this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Exception when invoking URL: "+ Utilities.getUrlFromRequest(request));
		    //this.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Exception in " + method.getName() + "()", ex);

	    	//TODO tranlate error msg and forward it to controller advice
	    	throw ex;	
	    }
	   	 
	   return value;
	} 
	
	
}
