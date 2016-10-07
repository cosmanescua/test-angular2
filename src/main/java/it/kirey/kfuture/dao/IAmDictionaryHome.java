package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmDictionary;

public interface IAmDictionaryHome {
	public static final String REPOSITORY_QUALIFIER = "amDictionaryHome";

	public List<AmDictionary> findByCategory(String lang, String category);

	public List<AmDictionary> getAll();
	
	public void attachDirty(AmDictionary instance);
	
	public void attachClean(AmDictionary instance);
	
	public void delete(AmDictionary persistentInstance);
	
	public AmDictionary merge(AmDictionary detachedInstance);
	
	public AmDictionary findById(java.lang.String id);
	
	public void persist(AmDictionary transientInstance);

}
