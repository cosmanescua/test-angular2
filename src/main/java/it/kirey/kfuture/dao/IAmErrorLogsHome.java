package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmErrorLogs;

public interface IAmErrorLogsHome {
	public static final String REPOSITORY_QUALIFIER = "amErrorLogsHome";

	public List<AmErrorLogs> getAll();
	
	public void attachDirty(AmErrorLogs instance);
	
	public void persist(AmErrorLogs transientInstance);
	
	public void attachClean(AmErrorLogs instance);
	
	public void delete(AmErrorLogs persistentInstance);
	
	public AmErrorLogs merge(AmErrorLogs detachedInstance);
	
	public AmErrorLogs findById(Integer id);

}
