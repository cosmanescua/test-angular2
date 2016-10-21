package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmUrlRoutes;
import it.kirey.kfuture.entity.AmUserAccounts;

public interface IAmUrlRoutesHome {

	public static final String REPOSITORY_QUALIFIER = "amUrlRoutesHome";
	
	public void persist(AmUrlRoutes transientInstance);
	public void attachDirty(AmUrlRoutes instance);
	public void attachClean(AmUrlRoutes instance);
	public void delete(AmUrlRoutes persistentInstance);
	public AmUrlRoutes merge(AmUrlRoutes detachedInstance);
	public AmUrlRoutes findById(Integer id);
	public List<AmUrlRoutes> findByExample(AmUrlRoutes instance);
	public List<AmUrlRoutes> findRoutesByUser(AmUserAccounts user);

}
