package it.kirey.kfuture.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmErrorLogsHome;
import it.kirey.kfuture.dao.IAmErrorTracesHome;
import it.kirey.kfuture.dao.IAmUserAccountsHome;
import it.kirey.kfuture.entity.AmErrorLogs;
import it.kirey.kfuture.entity.AmErrorTraces;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.service.ILoggerService;
import it.kirey.kfuture.util.ObjectTransformer;
import it.kirey.kfuture.util.Utilities;

@Service(value = ILoggerService.SERVICE_QUALIFIER)
public class LoggerServiceImpl implements ILoggerService {

	@Autowired
	public IAmErrorLogsHome amErrorLogsHome;
	
	@Autowired
	public IAmErrorTracesHome amErrorTracesHome;
	
	@Autowired
	public IAmUserAccountsHome amUserAccountsHome;
	
	@Override
	@Transactional(readOnly=true)
	public List<AmErrorLogs> getAllLogs() {
		List<AmErrorLogs> errList =  amErrorLogsHome.getAll();
		return errList;
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<AmErrorTraces> getAllTraces() {
	    List<AmErrorTraces> errList =  amErrorTracesHome.getAll();
		return errList;
	}

	@Override
	@Transactional(readOnly=true)
	public AmErrorTraces getTraceById(Integer id) {
		AmErrorTraces errTrace = amErrorTracesHome.findById(id);
		
		return errTrace;
	}
	
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
