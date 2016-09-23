package it.kirey.kfuture.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.RoleDao;
import it.kirey.kfuture.entity.Role;
import it.kirey.kfuture.service.RoleService;

@Service(value="roleService")
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleDao roleDao;

	@Override
	public void saveOrUpdate(Role role) {
		roleDao.saveOrUpdate(role);
	}

	@Override
	public Set<Role> getRoles(String username) {
		return roleDao.getRoles(username);
	}
	
}
