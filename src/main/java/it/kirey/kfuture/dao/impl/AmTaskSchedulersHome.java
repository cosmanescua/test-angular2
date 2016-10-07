package it.kirey.kfuture.dao.impl;

import static org.hibernate.criterion.Example.create;

// Generated Sep 22, 2016 3:04:37 PM by Hibernate Tools 5.1.0.CR1

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmTaskSchedulersHome;
import it.kirey.kfuture.entity.AmTaskSchedulers;

/**
 * Home object for domain model class AmTaskSchedulers.
 * 
 * @see .AmTaskSchedulers
 * @author Hibernate Tools
 */
@Repository(IAmTaskSchedulersHome.REPOSITORY_QUALIFIER)
public class AmTaskSchedulersHome implements IAmTaskSchedulersHome {

	private static final Log log = LogFactory.getLog(AmTaskSchedulersHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public String getCronExpression(String idTrigger) {
		try {
			AmTaskSchedulers confConfigs = (AmTaskSchedulers) sessionFactory.getCurrentSession()
					.createCriteria(AmTaskSchedulers.class).add(Restrictions.eq("name", idTrigger)).uniqueResult();
			return confConfigs.getCronExpression();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	@Override
	public void updateCronExpression(String idTrigger, String cronExpression) {
		try {
			AmTaskSchedulers confConfigs = (AmTaskSchedulers) sessionFactory.getCurrentSession()
					.createCriteria(AmTaskSchedulers.class).add(Restrictions.eq("name", idTrigger)).uniqueResult();
			confConfigs.setCronExpression(cronExpression);
			this.sessionFactory.getCurrentSession().saveOrUpdate(confConfigs);
		} catch (RuntimeException re) {
			throw re;
		}

	}

	@Override
	public AmTaskSchedulers getTaskSchedulerByName(String schedulerName) {
		return (AmTaskSchedulers) sessionFactory.getCurrentSession().createCriteria(AmTaskSchedulers.class)
				.add(Restrictions.eq("name", schedulerName)).uniqueResult();
	}

	public void persist(AmTaskSchedulers transientInstance) {
		log.debug("persisting AmTaskSchedulers instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmTaskSchedulers instance) {
		log.debug("attaching dirty AmTaskSchedulers instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmTaskSchedulers instance) {
		log.debug("attaching clean AmTaskSchedulers instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmTaskSchedulers persistentInstance) {
		log.debug("deleting AmTaskSchedulers instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmTaskSchedulers merge(AmTaskSchedulers detachedInstance) {
		log.debug("merging AmTaskSchedulers instance");
		try {
			AmTaskSchedulers result = (AmTaskSchedulers) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmTaskSchedulers findById(Integer id) {
		log.debug("getting AmTaskSchedulers instance with id: " + id);
		try {
			AmTaskSchedulers instance = (AmTaskSchedulers) sessionFactory.getCurrentSession()
					.get(AmTaskSchedulers.class, id);
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

	public List<AmTaskSchedulers> findByExample(AmTaskSchedulers instance) {
		log.debug("finding AmTaskSchedulers instance by example");
		try {
			List<AmTaskSchedulers> results = (List<AmTaskSchedulers>) sessionFactory.getCurrentSession()
					.createCriteria(AmTaskSchedulers.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
