package it.kirey.kfuture.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.dao.ILoggerDao;
import it.kirey.kfuture.entity.ErrorLog;
import it.kirey.kfuture.entity.ErrorTrace;
import it.kirey.kfuture.service.ILoggerService;
import it.kirey.kfuture.service.IPaginationService;

@Service(value = LoggerService.SPRING_QUALIFIER)
public class LoggerService implements ILoggerService {

	@Autowired
	ILoggerDao loggerDao;
	
	@Override
	public List<ErrorLog> getAllLogs() {
		return  loggerDao.getAllLogs();
	}

	@Override
	public ErrorLog getLogWithException(Exception ex) {
		return loggerDao.getLogWithException(ex);
	}

	@Override
	public List<ErrorTrace> getAllTraces() {
		return loggerDao.getAllTraces();
	}

	@Override
	public ErrorTrace getTraceForErrorLog(int id) {
		return loggerDao.getTraceForErrorLog(id);
	}

}
