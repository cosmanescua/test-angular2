package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmErrorTraces;

public interface IAmErrorTracesHome {
	public static final String REPOSITORY_QUALIFIER = "amErrorTracesHome";

	public List<AmErrorTraces> getAll();

	public AmErrorTraces findById(Integer id);
	
	public void attachDirty(AmErrorTraces instance);
	
	public void persist(AmErrorTraces transientInstance);
	
	public void attachClean(AmErrorTraces instance);
	
	public void delete(AmErrorTraces persistentInstance);
	
	public AmErrorTraces merge(AmErrorTraces detachedInstance);

}
