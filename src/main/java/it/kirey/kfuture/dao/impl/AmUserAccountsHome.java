package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 10:23:13 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmUserAccountsHome;
import it.kirey.kfuture.entity.AmApplicationRoles;
import it.kirey.kfuture.entity.AmUrlRoutes;
import it.kirey.kfuture.entity.AmUserAccounts;

/**
 * Home object for domain model class AmUserAccounts.
 * 
 * @see it.kirey.kfuture.gen.AmUserAccounts
 * @author Hibernate Tools
 */
@Repository(value = IAmUserAccountsHome.REPOSITORY_QUALIFIER)
public class AmUserAccountsHome implements IAmUserAccountsHome {

	private static final Log log = LogFactory.getLog(AmUserAccountsHome.class);

	@Autowired
	private SessionFactory sessionFactory;
	// @CachePut("security")

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AmUserAccounts user = (AmUserAccounts) sessionFactory.getCurrentSession().createCriteria(AmUserAccounts.class)
				.add(Restrictions.eq("username", username)).uniqueResult();
		if (null == user)
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		return user;
	}

	@Override
	public AmUserAccounts getUserByUsername(String username) throws UsernameNotFoundException {
		AmUserAccounts user = (AmUserAccounts) sessionFactory.getCurrentSession().createCriteria(AmUserAccounts.class)
				.add(Restrictions.eq("username", username)).uniqueResult();
		if (null == user)
			throw new UsernameNotFoundException("The user with name " + username + " was not found");
		return user;
	}

	@Override
	public AmUserAccounts getUserByToken(String token) throws UsernameNotFoundException {
		return (AmUserAccounts) sessionFactory.getCurrentSession().createCriteria(AmUserAccounts.class)
				.add(Restrictions.eq("token", token)).uniqueResult();
	}

	@Override
	public Integer countUsers() {
		return new Integer(((Number) sessionFactory.getCurrentSession().createCriteria(AmUserAccounts.class)
				.setProjection(Projections.rowCount()).uniqueResult()).intValue());
	}

	@Override
	public void deleteUserById(Integer id) {
		AmUserAccounts user = this.findById(id);
		sessionFactory.getCurrentSession().delete(user);
	}

	@Override
	public void persist(AmUserAccounts transientInstance) {
		log.debug("persisting AmUserAccounts instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@CachePut("security")
	@Override
	public void attachDirty(AmUserAccounts instance) {
		log.debug("attaching dirty AmUserAccounts instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmUserAccounts instance) {
		log.debug("attaching clean AmUserAccounts instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmUserAccounts persistentInstance) {
		log.debug("deleting AmUserAccounts instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmUserAccounts merge(AmUserAccounts detachedInstance) {
		log.debug("merging AmUserAccounts instance");
		try {
			AmUserAccounts result = (AmUserAccounts) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmUserAccounts findById(Integer id) {
		log.debug("getting AmUserAccounts instance with id: " + id);
		try {
			AmUserAccounts instance = (AmUserAccounts) sessionFactory.getCurrentSession()
					.get("it.kirey.kfuture.gen.AmUserAccounts", id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List<AmUserAccounts> findByExample(AmUserAccounts instance) {
		log.debug("finding AmUserAccounts instance by example");
		try {
			List<AmUserAccounts> results = (List<AmUserAccounts>) sessionFactory.getCurrentSession()
					.createCriteria("it.kirey.kfuture.gen.AmUserAccounts").add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@Override
	public void logoutUser(AmUserAccounts user) {
		log.debug("deleting token for user");
		try {
			user.setToken("");
			sessionFactory.getCurrentSession().update(user);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}

	}

	@Override
	public List<AmUrlRoutes> findRoutesByUser(AmUserAccounts user) {
		List<AmApplicationRoles> userRoles = user.getAmApplicationRoleses();
		List<AmUrlRoutes> userRouts = new ArrayList<>();
		for (AmApplicationRoles userRole : userRoles) {
			for (int i = 0; i < userRole.getAmUrlRouteses().size(); i++) {
				if (!userRouts.contains(userRole.getAmUrlRouteses().get(i)))
					userRouts.add(userRole.getAmUrlRouteses().get(i));
			}
		}
		return userRouts;
	}
}
