package it.kirey.kfuture.dao.impl;
// Generated Oct 14, 2016 11:23:15 AM by Hibernate Tools 4.3.5.Final

import static org.hibernate.criterion.Example.create;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.entity.AmApplicationRoles;
import it.kirey.kfuture.entity.AmUrlRoutes;
import it.kirey.kfuture.entity.AmUserAccounts;

/**
 * Home object for domain model class AmUrlRoutes.
 * @see it.kirey.kfuture.gen.AmUrlRoutes
 * @author Hibernate Tools
 */
@Repository(value = "amUrlRoutesHome")
public class AmUrlRoutesHome {

	private static final Log log = LogFactory.getLog(AmUrlRoutesHome.class);
	
	@Autowired
	private SessionFactory sessionFactory;

	public void persist(AmUrlRoutes transientInstance) {
		log.debug("persisting AmUrlRoutes instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmUrlRoutes instance) {
		log.debug("attaching dirty AmUrlRoutes instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmUrlRoutes instance) {
		log.debug("attaching clean AmUrlRoutes instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmUrlRoutes persistentInstance) {
		log.debug("deleting AmUrlRoutes instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmUrlRoutes merge(AmUrlRoutes detachedInstance) {
		log.debug("merging AmUrlRoutes instance");
		try {
			AmUrlRoutes result = (AmUrlRoutes) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmUrlRoutes findById(Integer id) {
		log.debug("getting AmUrlRoutes instance with id: " + id);
		try {
			AmUrlRoutes instance = (AmUrlRoutes) sessionFactory.getCurrentSession()
					.get("it.kirey.kfuture.gen.AmUrlRoutes", id);
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

	public List<AmUrlRoutes> findByExample(AmUrlRoutes instance) {
		log.debug("finding AmUrlRoutes instance by example");
		try {
			List<AmUrlRoutes> results = (List<AmUrlRoutes>) sessionFactory.getCurrentSession()
					.createCriteria("it.kirey.kfuture.gen.AmUrlRoutes").add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	 public List<AmUrlRoutes> findRoutesByUser(AmUserAccounts user) {
	  
	  List<AmApplicationRoles> userRoles = user.getAmApplicationRoleses();
	  List<AmUrlRoutes> userRouts = new ArrayList<>();
	   for (AmApplicationRoles userRole : userRoles) {
	    for (int i = 0; i < userRole.getAmUrlRouteses().size(); i++) {
	     if(!userRouts.contains(userRole.getAmUrlRouteses().get(i)))
	      userRouts.add(userRole.getAmUrlRouteses().get(i));
	     }
	   }
	  return userRouts;
	 }

}
