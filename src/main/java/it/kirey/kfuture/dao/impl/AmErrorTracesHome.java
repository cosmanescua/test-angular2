package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 10:23:13 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.entity.AmErrorTraces;

/**
 * Home object for domain model class AmErrorTraces.
 * 
 * @see it.kirey.kfuture.entity.AmErrorTraces
 * @author Hibernate Tools
 */
@Repository(value = "amErrorTracesHome")
public class AmErrorTracesHome {

	private static final Log log = LogFactory.getLog(AmErrorTracesHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public void persist(AmErrorTraces transientInstance) {
		log.debug("persisting AmErrorTraces instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}
	
	@Transactional
	public void attachDirty(AmErrorTraces instance) {
		log.debug("attaching dirty AmErrorTraces instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(AmErrorTraces instance) {
		log.debug("attaching clean AmErrorTraces instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(AmErrorTraces persistentInstance) {
		log.debug("deleting AmErrorTraces instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public AmErrorTraces merge(AmErrorTraces detachedInstance) {
		log.debug("merging AmErrorTraces instance");
		try {
			AmErrorTraces result = (AmErrorTraces) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}
	
	@Transactional	
	public AmErrorTraces findById(Integer id) {
		log.debug("getting AmErrorTraces instance with id: " + id);
		try {
			AmErrorTraces instance = (AmErrorTraces) sessionFactory.getCurrentSession()
					.get(AmErrorTraces.class, id);
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
	
	@Transactional
	public List<AmErrorTraces> findByExample(AmErrorTraces instance) {
		log.debug("finding AmErrorTraces instance by example");
		try {
			List<AmErrorTraces> results = (List<AmErrorTraces>) sessionFactory.getCurrentSession()
					.createCriteria(AmErrorTraces.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@Transactional
	public List<AmErrorTraces> findAll() {
		return (List<AmErrorTraces>) this.sessionFactory.getCurrentSession().createCriteria(AmErrorTraces.class).list();
	}
}
