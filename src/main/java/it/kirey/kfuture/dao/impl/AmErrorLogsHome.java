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

import it.kirey.kfuture.dao.IAmErrorLogsHome;
import it.kirey.kfuture.entity.AmErrorLogs;

/**
 * Home object for domain model class AmErrorLogs.
 * 
 * @see it.kirey.kfuture.gen.AmErrorLogs
 * @author Hibernate Tools
 */
@Repository(value = IAmErrorLogsHome.REPOSITORY_QUALIFIER)
public class AmErrorLogsHome implements IAmErrorLogsHome {

	private static final Log log = LogFactory.getLog(AmErrorLogsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmErrorLogs transientInstance) {
		log.debug("persisting AmErrorLogs instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}
	
	@Override
	public void attachDirty(AmErrorLogs instance) {
		log.debug("attaching dirty AmErrorLogs instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmErrorLogs instance) {
		log.debug("attaching clean AmErrorLogs instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmErrorLogs persistentInstance) {
		log.debug("deleting AmErrorLogs instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmErrorLogs merge(AmErrorLogs detachedInstance) {
		log.debug("merging AmErrorLogs instance");
		try {
			AmErrorLogs result = (AmErrorLogs) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmErrorLogs findById(Integer id) {
		log.debug("getting AmErrorLogs instance with id: " + id);
		try {
			AmErrorLogs instance = (AmErrorLogs) sessionFactory.getCurrentSession().get(AmErrorLogs.class, id);
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

	public List<AmErrorLogs> findByExample(AmErrorLogs instance) {
		log.debug("finding AmErrorLogs instance by example");
		try {
			List<AmErrorLogs> results = (List<AmErrorLogs>) sessionFactory.getCurrentSession()
					.createCriteria(AmErrorLogs.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@Override
	public List<AmErrorLogs> getAll() {
		return (List<AmErrorLogs>) this.sessionFactory.getCurrentSession().createCriteria(AmErrorLogs.class).list();
	}
}
