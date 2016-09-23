package it.kirey.kfuture.dao;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import it.kirey.kfuture.entity.User;

public interface UserDao extends UserDetailsService {

	public void saveOrUpdate(User user);

	public User findUserById(int id);

	public List<User> getUsers();

	public void deleteUserById(int id);

	public int getMaxItems();
	
	public User getUserByUsername(String username);
	
	public User getUserByToken(String token);
	
}
