package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmReports;

public interface IAmReportsHome {
	public static final String REPOSITORY_QUALIFIER = "amReportsHome";
	
	public void persist(AmReports transientInstance);

	public void attachDirty(AmReports instance);

	public void attachClean(AmReports instance);

	public void delete(AmReports persistentInstance);

	public AmReports merge(AmReports detachedInstance);

	public AmReports findById(Integer id);

	public List<AmReports> getAll();
}
