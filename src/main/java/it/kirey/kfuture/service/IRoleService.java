package it.kirey.kfuture.service;

import java.util.Set;

import it.kirey.kfuture.entity.AmApplicationRoles;

public interface IRoleService {
	public static final String SERVICE_QUALIFIER = "roleService";
	public void saveOrUpdate(AmApplicationRoles role);
	public Set<AmApplicationRoles> getRoles(String username);
}
