package it.kirey.kfuture.testcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.entity.AmErrorLogs;
import it.kirey.kfuture.security.AuthenticationTokenProcessingFilter;
import it.kirey.kfuture.service.ITestCacheService;

@RestController
@RequestMapping(value="/rest")
public class TestController {
	private static final Logger LOGGER = Logger.getLogger(TestController.class.getName());
	
	@Autowired
	ITestCacheService testCacheService;
	
	@RequestMapping(value="/testCache", method = RequestMethod.GET )
	public ResponseEntity<Map<String, Object>> getErrorLogs(){
		
		Long startTime = System.nanoTime();
		List<AmErrorLogs> amE = testCacheService.getAllErrorLogs();
		Long endTime = System.nanoTime();
		Long result = endTime-startTime;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ErrorLogs", amE);
		map.put("executeTime", result);
		
		LOGGER.log( Level.INFO, "Getting cache: " + result/1000000000 + "ns");
		LOGGER.log( Level.INFO, "Getting cache: " + result/1000000 + "ms");
		
		//System.err.println(result/1000000000);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/testCacheEvict", method = RequestMethod.GET)
	public ResponseEntity<String> cacheEvict(){
		testCacheService.cacheEvict();
		return new ResponseEntity<String>("CacheEvict OK", HttpStatus.OK);
	}
	
}
