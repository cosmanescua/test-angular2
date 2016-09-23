package it.kirey.kfuture.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import it.kirey.kfuture.entity.ErrorLog;
import it.kirey.kfuture.entity.ErrorTrace;

public interface ILoggerDao {
	
	public static final String SPRING_QUALIFIER = "loggerDao";
	public void log(Throwable ex,  String invokingUrl);
	public List<ErrorLog> getAllLogs();
	public ErrorLog getLogWithException(Exception ex);
	public List<ErrorTrace> getAllTraces();
	public ErrorTrace getTraceForErrorLog(int id);

}
