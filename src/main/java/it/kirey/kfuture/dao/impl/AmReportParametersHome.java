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

import it.kirey.kfuture.dao.IAmReportParametersHome;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmReports;

/**
 * Home object for domain model class AmReportParameters.
 * 
 * @see it.kirey.kfuture.gen.AmReportParameters
 * @author Hibernate Tools
 */
@Repository(value = IAmReportParametersHome.REPOSITORY_QUALIFIER)
public class AmReportParametersHome implements IAmReportParametersHome {

	private static final Log log = LogFactory.getLog(AmReportParametersHome.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void persist(AmReportParameters transientInstance) {
		log.debug("persisting AmReportParameters instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(AmReportParameters instance) {
		log.debug("attaching dirty AmReportParameters instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmReportParameters instance) {
		log.debug("attaching clean AmReportParameters instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmReportParameters persistentInstance) {
		log.debug("deleting AmReportParameters instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
	
	@Override
	public AmReportParameters merge(AmReportParameters detachedInstance) {
		log.debug("merging AmReportParameters instance");
		try {
			AmReportParameters result = (AmReportParameters) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}
	
	@Override
	public AmReportParameters findById(Integer id) {
		log.debug("getting AmReportParameters instance with id: " + id);
		try {
			AmReportParameters instance = (AmReportParameters) sessionFactory.getCurrentSession()
					.get(AmReportParameters.class, id);
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

	public List<AmReportParameters> findByExample(AmReportParameters instance) {
		log.debug("finding AmReportParameters instance by example");
		try {
			List<AmReportParameters> results = (List<AmReportParameters>) sessionFactory.getCurrentSession()
					.createCriteria(AmReportParameters.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	@Override
	public List<AmReportParameters> getAll() {
		return (List<AmReportParameters>) this.sessionFactory.getCurrentSession().createCriteria(AmReportParameters.class).list();
	}
}
