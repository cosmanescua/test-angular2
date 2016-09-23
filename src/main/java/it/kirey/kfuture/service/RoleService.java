package it.kirey.kfuture.service;

import java.util.Set;

import it.kirey.kfuture.entity.Role;

public interface RoleService {
	public void saveOrUpdate(Role role);
	public Set<Role> getRoles(String username);
}
