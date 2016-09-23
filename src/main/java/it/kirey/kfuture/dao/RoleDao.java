package it.kirey.kfuture.dao;

import java.util.List;
import java.util.Set;

import it.kirey.kfuture.entity.Role;

public interface RoleDao {
	public void saveOrUpdate(Role role);

	public Set<Role> getRoles(String username);
}
