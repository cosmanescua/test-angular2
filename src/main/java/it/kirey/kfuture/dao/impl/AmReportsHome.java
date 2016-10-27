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

import it.kirey.kfuture.entity.AmReports;

/**
 * Home object for domain model class AmReports.
 * 
 * @see it.kirey.kfuture.gen.AmReports
 * @author Hibernate Tools
 */
@Repository(value = "amReportsHome")
public class AmReportsHome{

	private static final Log log = LogFactory.getLog(AmReportsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public void persist(AmReports transientInstance) {
		log.debug("persisting AmReports instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachDirty(AmReports instance) {
		log.debug("attaching dirty AmReports instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(AmReports instance) {
		log.debug("attaching clean AmReports instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(AmReports persistentInstance) {
		log.debug("deleting AmReports instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReports merge(AmReports detachedInstance) {
		log.debug("merging AmReports instance");
		try {
			AmReports result = (AmReports) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReports findById(Integer id) {
		log.debug("getting AmReports instance with id: " + id);
		try {
			AmReports instance = (AmReports) sessionFactory.getCurrentSession().get(AmReports.class,
					id);
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
	public List<AmReports> findByExample(AmReports instance) {
		log.debug("finding AmReports instance by example");
		try {
			List<AmReports> results = (List<AmReports>) sessionFactory.getCurrentSession()
					.createCriteria(AmReports.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	@Transactional
	public List<AmReports> findAll() {
		return (List<AmReports>) this.sessionFactory.getCurrentSession().createCriteria(AmReports.class).list();
	}
}
