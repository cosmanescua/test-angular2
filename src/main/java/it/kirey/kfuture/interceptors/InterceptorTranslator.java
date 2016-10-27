package it.kirey.kfuture.interceptors;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import it.kirey.kfuture.util.PrintingToConsole;
import it.kirey.kfuture.util.Translation;




public class InterceptorTranslator implements ThrowsAdvice  {

	@Autowired
	private PrintingToConsole printer;
	
	@Autowired
	private Translation translator;

	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable {  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Translator Begin " + method.getName() + "()");
		Object result = null;
		String resultBody = null;
		ResponseEntity<Object> obj = null;
	   
	    try {
	        result = pjp.proceed(); 
	    
	    	if(result instanceof ResponseEntity)
			{	
	    		ObjectMapper mapper = new ObjectMapper();
	    		/*mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);*/
	    		obj = (ResponseEntity<Object>) result;
				//ObjectWriter ow = new ObjectMapper().writer();
	    		String responseString = mapper.writer().writeValueAsString(obj.getBody());    		
	    		
				//String responseString = ow.writeValueAsString(obj.getBody());    		
				resultBody = translator.translate(responseString);				
			}
	    } catch (Exception ex) {
	    	
	    	throw ex;	
	    }
	    
	   if(result instanceof ResponseEntity)	 
	   	    return  new ResponseEntity<Object>(resultBody, obj.getHeaders(), obj.getStatusCode()); 
	    else
	    	return result;
	}
}
