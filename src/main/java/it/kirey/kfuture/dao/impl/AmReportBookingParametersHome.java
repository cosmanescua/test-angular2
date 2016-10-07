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

import it.kirey.kfuture.dao.IAmReportBookingParametersHome;
import it.kirey.kfuture.entity.AmReportBookingParameters;

/**
 * Home object for domain model class AmReportBookingParameters.
 * 
 * @see it.kirey.kfuture.gen.AmReportBookingParameters
 * @author Hibernate Tools
 */
@Repository(value = IAmReportBookingParametersHome.REPOSITORY_QUALIFIER)
public class AmReportBookingParametersHome implements IAmReportBookingParametersHome {

	private static final Log log = LogFactory.getLog(AmReportBookingParametersHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmReportBookingParameters transientInstance) {
		log.debug("persisting AmReportBookingParameters instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(AmReportBookingParameters instance) {
		log.debug("attaching dirty AmReportBookingParameters instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmReportBookingParameters instance) {
		log.debug("attaching clean AmReportBookingParameters instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmReportBookingParameters persistentInstance) {
		log.debug("deleting AmReportBookingParameters instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmReportBookingParameters merge(AmReportBookingParameters detachedInstance) {
		log.debug("merging AmReportBookingParameters instance");
		try {
			AmReportBookingParameters result = (AmReportBookingParameters) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmReportBookingParameters findById(Integer id) {
		log.debug("getting AmReportBookingParameters instance with id: " + id);
		try {
			AmReportBookingParameters instance = (AmReportBookingParameters) sessionFactory.getCurrentSession()
					.get(AmReportBookingParameters.class, id);
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

	public List<AmReportBookingParameters> findByExample(AmReportBookingParameters instance) {
		log.debug("finding AmReportBookingParameters instance by example");
		try {
			List<AmReportBookingParameters> results = (List<AmReportBookingParameters>) sessionFactory
					.getCurrentSession().createCriteria(AmReportBookingParameters.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
