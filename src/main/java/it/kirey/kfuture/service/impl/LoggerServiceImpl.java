package it.kirey.kfuture.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.impl.AmErrorLogsHome;
import it.kirey.kfuture.dao.impl.AmErrorTracesHome;
import it.kirey.kfuture.entity.AmErrorLogs;
import it.kirey.kfuture.entity.AmErrorTraces;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.service.ILoggerService;
import it.kirey.kfuture.util.Utilities;

@Service(value = ILoggerService.SERVICE_QUALIFIER)
public class LoggerServiceImpl implements ILoggerService {

	@Autowired
	AmErrorLogsHome amErrorLogsHome;
	
	@Autowired
	AmErrorTracesHome amErrorTracesHome;
	
	/**
	 * Setting data for AmErrorLogs and AmErrorTraces and saving to database
	 */
	@Override
	@Transactional
	public void log(Throwable ex, String invokingUrl) {
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object details = securityContext.getAuthentication().getPrincipal();
		AmUserAccounts user = null;
		if (details instanceof AmUserAccounts) {
			user = (AmUserAccounts) details;
		}
	
		AmErrorLogs e = new AmErrorLogs();
		e.setErrorName(ex.toString());
		e.setMessage(Utilities.getErrorMessage(ex));

		if (user != null) {
			e.setAmUserAccounts(user);
		}
		e.setInvokingUrl(invokingUrl);
		
		AmErrorTraces amErrorTraces = new AmErrorTraces();
		amErrorTraces.setTrace(Utilities.getErrorStackTrace(ex));
		
		amErrorTraces.setAmErrorLogs(e);
	
		e.setThrownDate(new java.util.Date());
		
		amErrorLogsHome.attachDirty(e);

		amErrorTracesHome.attachDirty(amErrorTraces);
		
	}

}
