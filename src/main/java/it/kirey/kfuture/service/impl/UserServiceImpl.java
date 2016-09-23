package it.kirey.kfuture.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.UserDao;
import it.kirey.kfuture.entity.User;
import it.kirey.kfuture.service.UserService;

@Service(value="userService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public void saveOrUpdate(User newUser) {
		userDao.saveOrUpdate(newUser);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userDao.loadUserByUsername(username);
	}
	
	
	@Override
	public User getUserByUsername(String username) throws UsernameNotFoundException {
		return userDao.getUserByUsername(username);
	}
	
	@Override
	public User getUserByToken(String token) throws UsernameNotFoundException {
		return userDao.getUserByToken(token);
	}

	@Override
	@Transactional
	public User getById(Integer id) {
		return this.userDao.findUserById(id);
	}

}
