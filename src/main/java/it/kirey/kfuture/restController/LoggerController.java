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

import it.kirey.kfuture.dto.ErrorTraceDto;
import it.kirey.kfuture.entity.ErrorLog;
import it.kirey.kfuture.entity.ErrorTrace;
import it.kirey.kfuture.service.ILoggerService;

@RestController
@RequestMapping("/log")
public class LoggerController {
	
	@Autowired
	ILoggerService loggerService;
	 
	Log logger = LogFactory.getLog(getClass());
	
	/**
	 * Returns all error logs from database
	 * @return
	 */
	@RequestMapping(value = "/logs", method = RequestMethod.GET)
	public ResponseEntity<List<ErrorLog>> getAllLogs() {		
		List<ErrorLog> logs= loggerService.getAllLogs();
		return new ResponseEntity<List<ErrorLog>>(logs, HttpStatus.OK);	
	}
	
	/**
	 * Returns stack trace for specific error log (parameter id is id of errorLog)
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/traces/{id}", method = RequestMethod.GET)
	public ResponseEntity<ErrorTraceDto> getTrace(@PathVariable(value = "id") int id) {		
		
		ErrorTrace trace= loggerService.getTraceForErrorLog(id);
		//TODO zameniti metodom za transformisanje
		ErrorTraceDto errorTraceDto = new ErrorTraceDto();
		errorTraceDto.setTrace(trace.getTrace());
		errorTraceDto.setErrorLogId(trace.getError().getId());
		
		
		return new ResponseEntity<ErrorTraceDto>(errorTraceDto, HttpStatus.OK);	
	}
	
	
}
