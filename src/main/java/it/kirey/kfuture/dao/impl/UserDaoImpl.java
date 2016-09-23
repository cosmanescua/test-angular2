package it.kirey.kfuture.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.RoleDao;
import it.kirey.kfuture.dao.UserDao;
import it.kirey.kfuture.entity.User;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
//	@CacheEvict("security")
	@CachePut("security")
	public void saveOrUpdate(User user) {
		sessionFactory.getCurrentSession().saveOrUpdate(user);
	}
	
	@Override
	public User findUserById(int id) {
		return (User) sessionFactory.getCurrentSession().createCriteria(User.class).add(Restrictions.idEq(id))
				.uniqueResult();
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = (User) sessionFactory.getCurrentSession().createCriteria(User.class)
				.add(Restrictions.eq("username", username)).uniqueResult();

		if (null == user) {
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		}
		return user;
	}
	
	
	@Override
	public User getUserByUsername(String username) throws UsernameNotFoundException {
		User user = (User) sessionFactory.getCurrentSession().createCriteria(User.class)
				.add(Restrictions.eq("username", username)).uniqueResult();
		if (null == user) {
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		}
		return user;
	}

	
	@Override
	@Cacheable("security")
	public User getUserByToken(String token) throws UsernameNotFoundException {
		return (User) sessionFactory.getCurrentSession().createCriteria(User.class)
				.add(Restrictions.eq("token", token)).uniqueResult();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<User> getUsers() {
		return (List<User>) sessionFactory.getCurrentSession().createCriteria(User.class).list();
	}

	@Override
	public int getMaxItems() {
		return ((Number) sessionFactory.getCurrentSession().createCriteria(User.class)
				.setProjection(Projections.rowCount()).uniqueResult()).intValue();
	}

	@Override
	public void deleteUserById(int id) {
		User user = this.findUserById(id);
		sessionFactory.getCurrentSession().delete(user);
	}

}
