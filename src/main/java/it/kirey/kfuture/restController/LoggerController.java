package it.kirey.kfuture.restController;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.dao.impl.AmErrorLogsHome;
import it.kirey.kfuture.dao.impl.AmErrorTracesHome;
import it.kirey.kfuture.entity.AmErrorLogs;
import it.kirey.kfuture.entity.AmErrorTraces;
import it.kirey.kfuture.service.ILoggerService;

@RestController
@RequestMapping("/log")
public class LoggerController {
		
	@Autowired
	AmErrorLogsHome amErrorLogsHome;
	
	@Autowired
	AmErrorTracesHome amErrorTracesHome;
	 
	Log logger = LogFactory.getLog(getClass());
	
	/**
	 * Returns all error logs from database
	 * @return
	 */
	
	
	@RequestMapping(value = "/logs", method = RequestMethod.GET)
	public ResponseEntity<List<AmErrorLogs>> getAllLogs() {		
		List<AmErrorLogs> logs= amErrorLogsHome.findAll();
		return new ResponseEntity<List<AmErrorLogs>>(logs, HttpStatus.OK);	
	}
	
	/**
	 * Returns stack trace for specific error log (parameter id is id of errorLog)
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/traces/{id}", method = RequestMethod.GET)
	public ResponseEntity<AmErrorTraces> getTrace(@PathVariable(value = "id") int id) {		
		
		AmErrorTraces trace= amErrorTracesHome.findById(id);				
		return new ResponseEntity<AmErrorTraces>(trace, HttpStatus.OK);	
	}
	
	
}
