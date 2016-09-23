package it.kirey.kfuture.service;

import java.util.List;

import it.kirey.kfuture.entity.ErrorLog;
import it.kirey.kfuture.entity.ErrorTrace;

public interface ILoggerService {
	public static final String SPRING_QUALIFIER = "loggerService";
	
	public List<ErrorLog> getAllLogs();
	public ErrorLog getLogWithException(Exception ex);
	public List<ErrorTrace> getAllTraces();
	public ErrorTrace getTraceForErrorLog(int id);

}
