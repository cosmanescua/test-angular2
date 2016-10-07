package it.kirey.kfuture.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmUserAccountsHome;
import it.kirey.kfuture.entity.AmUserAccounts;
import it.kirey.kfuture.service.IUserService;
import it.kirey.kfuture.util.Utilities;

@Service(value=IUserService.SERVICE_QUALIFIER)
public class UserServiceImpl implements IUserService {

	@Autowired
	private IAmUserAccountsHome amUserAccountsHome;

	@Override
	@Transactional
	public void saveOrUpdate(AmUserAccounts newUser) {
		amUserAccountsHome.attachDirty(newUser);
	}

	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return amUserAccountsHome.loadUserByUsername(username);
	}
	
	@Override
	@Transactional(readOnly=true)
	public AmUserAccounts getUserByUsername(String username) throws UsernameNotFoundException {
		return amUserAccountsHome.getUserByUsername(username);
	}
	
	@Override
	@Transactional(readOnly=true)
	public AmUserAccounts getUserByToken(String token) throws UsernameNotFoundException {
		return amUserAccountsHome.getUserByToken(token);
	}

	@Override
	@Transactional(readOnly=true)
	public AmUserAccounts getById(Integer id) {
		return this.amUserAccountsHome.findById(id);
	}

	@Override
	@Transactional
	public void changeDefaultLanguage(String langCode) {
		AmUserAccounts user = Utilities.getUserFromContext();
		user.setDefaultLanguage(langCode);
		amUserAccountsHome.attachDirty(user);
	}

}
