package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.AmResourceBundle;

public interface IAmResourceBundleHome{
	public static final String REPOSITORY_QUALIFIER = "amResourceBundleHome";
	
	public void persist(AmResourceBundle transientInstance);

}
