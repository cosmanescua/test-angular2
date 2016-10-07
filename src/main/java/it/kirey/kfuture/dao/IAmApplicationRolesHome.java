package it.kirey.kfuture.dao;

import java.util.Set;

import it.kirey.kfuture.entity.AmApplicationRoles;

public interface IAmApplicationRolesHome{
	public static final String REPOSITORY_QUALIFIER = "amApplicationRolesHome";
	
	public void persist(AmApplicationRoles transientInstance);
	public void attachDirty(AmApplicationRoles instance);
	public void attachClean(AmApplicationRoles instance);
	public void delete(AmApplicationRoles persistentInstance);
	public AmApplicationRoles merge(AmApplicationRoles detachedInstance);
	public AmApplicationRoles findById(Integer id);
	public Set<AmApplicationRoles> getRolesByUsername(String username);
}
