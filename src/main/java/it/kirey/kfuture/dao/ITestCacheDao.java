package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmErrorLogs;

public interface ITestCacheDao {
	
	public static final String REPOSITORY_QUALIFIER = "ErrorLogsDao";
	
	public List<AmErrorLogs> getAllErrorLogs();
	public void cacheEvict();
}
