package it.kirey.kfuture.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import it.kirey.kfuture.entity.User;

public interface UserService extends UserDetailsService {

	public void saveOrUpdate(User newUser);
	
	public User getById(Integer id);

//	public void insertWithKeyHolder(User newUser);
	
	public User getUserByUsername(String username);
	
	public User getUserByToken(String token);

}
