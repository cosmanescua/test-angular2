package it.kirey.kfuture.restController;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import it.kirey.kfuture.dto.TestObject;
import it.kirey.kfuture.security.AuthenticationTokenProcessingFilter;
import it.kirey.kfuture.security.SecurityCache;


/**
 * TestSecurityController is used for security testing purposes of different http methods 
 * @author Vladimir
 *
 */

@RestController
@RequestMapping("/rest/security")
public class TestSecurityController {
	private static final Logger LOGGER = Logger.getLogger(TestSecurityController.class.getName());
	
	
	/**
	 * Testing of GET method with /rest/security/test
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public ResponseEntity<String> getAll() {		
		LOGGER.log( Level.INFO, "Security Controller: /rest/security/test -------------------- GET method");
		return new ResponseEntity<String>("GET method completed", HttpStatus.OK);	
	}
	
	
	/**
	 * This method clears the cache in the SecurityCache class. Only the elapsed tokens are removed from the cache.
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/test/clearCache", method = RequestMethod.GET)
	public ResponseEntity<String> clearCache() {	
		LOGGER.log( Level.INFO, "Security Controller: /rest/security/test/clearCache -------------------- GET method");
		SecurityCache.clearElapsedTokens();
		return new ResponseEntity<String>("Cache cleared"+SecurityCache.getNumberOfErasedItemsInCache(), HttpStatus.OK);	
	}

	/**
	 * Testing of POST method with /rest/security/test
	 * @return ResponseEntity
	 */	
	//example for create object    
    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public ResponseEntity<String> createObject(@RequestBody TestObject testObj) {
    	LOGGER.log( Level.INFO, "Security Controller: /rest/security/test -------------------- POST method");
        return new ResponseEntity<String>("POST method completed", HttpStatus.CREATED);
    }
	
    
	/**
	 * Testing of PUT method with /rest/security/test
	 * @return ResponseEntity
	 */    
	//example update object
	@RequestMapping(value = "/test", method = RequestMethod.PUT)
	public ResponseEntity<String> updateTestObject(@RequestBody TestObject testObj) {
		LOGGER.log( Level.INFO, "Security Controller: /rest/security/test -------------------- PUT method");
		return new ResponseEntity<String>("PUT method completed" + testObj.toString() ,HttpStatus.OK);		
	}

	
	/**
	 * Testing of DELETE method with /rest/security/test
	 * @return ResponseEntity
	 */	
	//example delete object test with given id
	@RequestMapping(value = "/test/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
		LOGGER.log( Level.INFO, "Security Controller: /rest/security/test -------------------- DELETE method");
	    return new ResponseEntity<String>("DELETE method completed",HttpStatus.NO_CONTENT);
	}
	
}
