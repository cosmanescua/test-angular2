package it.kirey.kfuture.service;

import java.util.List;

import it.kirey.kfuture.entity.AmErrorLogs;
import it.kirey.kfuture.entity.AmErrorTraces;

public interface ILoggerService {
	public static final String SERVICE_QUALIFIER = "loggerService";
	public List<AmErrorLogs> getAllLogs();
	public List<AmErrorTraces> getAllTraces();
	public AmErrorTraces getTraceById(Integer id);
	public void log(Throwable ex, String invokingUrl);
}
