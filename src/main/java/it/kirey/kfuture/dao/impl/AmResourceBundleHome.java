package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 13:34:35 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmResourceBundleHome;
import it.kirey.kfuture.entity.AmResourceBundle;

/**
 * Home object for domain model class AmResourceBundle.
 * 
 * @see it.kirey.kfuture.gen.AmResourceBundle
 * @author Hibernate Tools
 */
@Repository(value = IAmResourceBundleHome.REPOSITORY_QUALIFIER)
public class AmResourceBundleHome implements IAmResourceBundleHome {

	private static final Log log = LogFactory.getLog(AmResourceBundleHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmResourceBundle transientInstance) {
		log.debug("persisting AmResourceBundle instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmResourceBundle instance) {
		log.debug("attaching dirty AmResourceBundle instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmResourceBundle instance) {
		log.debug("attaching clean AmResourceBundle instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmResourceBundle persistentInstance) {
		log.debug("deleting AmResourceBundle instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmResourceBundle merge(AmResourceBundle detachedInstance) {
		log.debug("merging AmResourceBundle instance");
		try {
			AmResourceBundle result = (AmResourceBundle) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmResourceBundle findById(Integer id) {
		log.debug("getting AmResourceBundle instance with id: " + id);
		try {
			AmResourceBundle instance = (AmResourceBundle) sessionFactory.getCurrentSession()
					.get(AmResourceBundle.class, id);
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

	public List<AmResourceBundle> findByExample(AmResourceBundle instance) {
		log.debug("finding AmResourceBundle instance by example");
		try {
			List<AmResourceBundle> results = (List<AmResourceBundle>) sessionFactory.getCurrentSession()
					.createCriteria(AmResourceBundle.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
