package it.kirey.kfuture.service;

import java.util.List;

import it.kirey.kfuture.entity.AmErrorLogs;


public interface ITestCacheService {
	
	public static final String SERVICE_QUALIFIER = "testCacheService";

	public List<AmErrorLogs> getAllErrorLogs();
	public void cacheEvict();

}
