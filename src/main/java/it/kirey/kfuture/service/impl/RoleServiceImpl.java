package it.kirey.kfuture.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmApplicationRolesHome;
import it.kirey.kfuture.entity.AmApplicationRoles;
import it.kirey.kfuture.service.IRoleService;

@Service(value=IRoleService.SERVICE_QUALIFIER)
public class RoleServiceImpl implements IRoleService {
	
	@Autowired
	private IAmApplicationRolesHome amApplicationRolesHome;

	@Override
	@Transactional
	public void saveOrUpdate(AmApplicationRoles role) {
		amApplicationRolesHome.attachDirty(role);
	}

	@Override
	@Transactional(readOnly=true)
	public Set<AmApplicationRoles> getRoles(String username) {
		return amApplicationRolesHome.getRolesByUsername(username);
	}
	
}
