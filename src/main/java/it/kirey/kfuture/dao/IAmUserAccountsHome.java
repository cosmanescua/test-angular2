package it.kirey.kfuture.dao;

import org.springframework.security.core.userdetails.UserDetailsService;

import it.kirey.kfuture.entity.AmUserAccounts;

public interface IAmUserAccountsHome extends UserDetailsService {
	public static final String REPOSITORY_QUALIFIER = "amUserAccountsHome";

	public AmUserAccounts getUserByUsername(String username);

	public AmUserAccounts getUserByToken(String token);

	public Integer countUsers();

	public void deleteUserById(Integer id);

	public AmUserAccounts findById(Integer i);
	
	public void attachDirty(AmUserAccounts instance);
	
	public void attachClean(AmUserAccounts instance);
	
	public void delete(AmUserAccounts persistentInstance);
	
	public AmUserAccounts merge(AmUserAccounts detachedInstance);
	
	public void persist(AmUserAccounts transientInstance);
}
