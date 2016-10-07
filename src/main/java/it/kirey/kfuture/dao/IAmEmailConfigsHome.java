package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmEmailConfigs;


public interface IAmEmailConfigsHome {

	public static final String SPRING_QUALIFIER = "amEmailConfigsHome";
	
	public AmEmailConfigs getEmailConfigs();

	public void persist(AmEmailConfigs transientInstance);

	public void attachDirty(AmEmailConfigs instance);

	public void attachClean(AmEmailConfigs instance);

	public void delete(AmEmailConfigs persistentInstance);

	public AmEmailConfigs merge(AmEmailConfigs detachedInstance);

	public AmEmailConfigs findById(Integer id);

	public List<AmEmailConfigs> findByExample(AmEmailConfigs instance);

}
