package it.kirey.kfuture.restController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.dto.CustomerDto;
import it.kirey.kfuture.dto.TestObject;
import it.kirey.kfuture.service.ILoggerService;
import it.kirey.kfuture.service.IOrderServiceForEmail;

@RestController
@RequestMapping("/demo")
public class DemoController {
	
	public DemoController(){}

	@Autowired
	private IOrderServiceForEmail orderService;
	
	/**
	 * Demo example using @PathVariable in request
	 * example http://localhost:8091/KFutureDemo/demo/testObjects/2
	   There is no limit on the number of parameters used in a single method. You can use more than one dynamic parameter in a single method’s parameter.
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/testObjects/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TestObject> getTestObject(@PathVariable(value = "id") int id) {

		TestObject testObj = new TestObject();
		testObj.setId(5);
		return new ResponseEntity<TestObject>(testObj, HttpStatus.OK);	
		
	}
	
	/**
	 * Demo example using RequestParam in request
	 * example http://localhost:8091/KFutureDemo/demo/testObjectsParam?id=1
       There is no limit on the number of parameters used example http://localhost:8091/KFutureDemo/demo/testObjectsParam?id=1&data=test 
     * @RequestParam parameter is optional 
	 * @param id
	 * @param filter
	 * @return
	 */
	@RequestMapping(value = "/testObjectsParam", method = RequestMethod.GET)
	public ResponseEntity<String> getTestObjectParam(@RequestParam(required = true) String id, @RequestParam(required = false) String filter) {
		
		
		return new ResponseEntity<String>("Request param example "+id+" filter: "+filter, HttpStatus.OK);		
	}
	
	/**
	 * Demo example how to pass parameters in header
	 * @param test
	 * @param acceptLanguage
	 * @param userAgent
	 * @return
	 */
	@RequestMapping(value = "/testHeader", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> test4(
			@RequestHeader(value="test") String test,
			@RequestHeader(value="Accept-Language") String acceptLanguage,
			@RequestHeader(value="User-Agent", defaultValue="foo") String userAgent) {
		
		return new ResponseEntity<String>("Header example test: "+ test+
				" Accept-Language: "+acceptLanguage+ 
				" User-Agent: "+userAgent, 
				HttpStatus.OK);		
	}
	
	/**
	 * Display file
	 * Request example http://localhost:8091/KFutureDemo/demo/displayFile?fileName=test.pdf  
	 * test.pdf is an external file with path D:/test.pdf
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/displayFile", method = RequestMethod.GET, produces = "application/pdf")
	public ResponseEntity<InputStreamResource> displayPdfFile(@RequestParam(required = true) String fileName) throws IOException {

		InputStream inputStream = new FileInputStream("D:/"+fileName);
	    File file = new File("D:/"+fileName);
  
	    return ResponseEntity
	            .ok()
	            .contentLength((int) file.length())
	            .header("Content-Disposition", String.format("inline; filename=\"" + fileName +"\""))
	            .header("Content-Type", "application/octet-stream")
	            .contentType(MediaType.parseMediaType("application/pdf"))
	            
	            .body(new InputStreamResource(inputStream));
	}
	
	/**
	 * Download file example
	 * http://localhost:8091/KFutureDemo/demo/downloadFile?fileName=test.pdf  
	 * test.pdf is an internal file(stored in resources)
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/downloadFile", method = RequestMethod.GET, produces = "application/pdf")
	public ResponseEntity<InputStreamResource> displayFileInternal(@RequestParam(required = true) String fileName) throws IOException {

		ClassPathResource file = new ClassPathResource(fileName);
	   
	    return ResponseEntity
	            .ok()
	            .contentLength((int) file.contentLength())
	            .header("Content-Disposition", String.format("attachment; filename=\"" + fileName +"\""))
	            .header("Content-Type", "application/octet-stream")
	            .contentType(MediaType.parseMediaType("application/pdf"))
	            
	            .body(new InputStreamResource(file.getInputStream()));
	}
	
	/**
	 * Test method sending mail
	 * example http://localhost:8091/KFutureDemo/demo/testEmail
	 * @return
	 */
	@RequestMapping(value = "/testEmail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> testEmail() {
		
		CustomerDto customer = orderService.getCustomerDetails();
		orderService.sendOrderConfirmation(customer);
		
		return new ResponseEntity<String>("TEST Email OK", HttpStatus.OK);	
	}
	
}
