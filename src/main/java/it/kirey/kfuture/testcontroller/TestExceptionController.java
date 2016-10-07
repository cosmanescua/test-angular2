
package it.kirey.kfuture.testcontroller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.entity.AmReports;
import it.kirey.kfuture.exception.ITestService;


@RestController
@RequestMapping("/test")
public class TestExceptionController {

	@Autowired
	ITestService testService;
	
	/**
	 * Test method for exception handling
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/exc", method = RequestMethod.GET)
	public ResponseEntity<Object> handleException1() throws Exception {		
		
		testService.testExceptionMethod();
		return new ResponseEntity<Object>("TEST OK", HttpStatus.OK);			
	}
	
	@RequestMapping(value = "/forms", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> saveReport(@RequestBody @Valid AmReports report, BindingResult result) throws Exception{
	
			if(result.hasErrors()){
				//generate new validation exception
				return new ResponseEntity<Object>(result.getFieldError().toString(), HttpStatus.CONFLICT);
			}else{
				
				return new ResponseEntity<Object>("Validation test ok", HttpStatus.OK);
			}
			
	}
	
}
