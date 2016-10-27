package it.kirey.kfuture.service;

public interface ILoggerService {
	public static final String SERVICE_QUALIFIER = "loggerService";
	public void log(Throwable ex, String invokingUrl);
}
