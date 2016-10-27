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

import it.kirey.kfuture.entity.AmReportBookingBlobs;

/**
 * Home object for domain model class AmReportBookingBlobs.
 * 
 * @see it.kirey.kfuture.gen.AmReportBookingBlobs
 * @author Hibernate Tools
 */
@Repository(value = "amReportBookingBlobsHome")
public class AmReportBookingBlobsHome{

	private static final Log log = LogFactory.getLog(AmReportBookingBlobsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public void persist(AmReportBookingBlobs transientInstance) {
		log.debug("persisting AmReportBookingBlobs instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachDirty(AmReportBookingBlobs instance) {
		log.debug("attaching dirty AmReportBookingBlobs instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(AmReportBookingBlobs instance) {
		log.debug("attaching clean AmReportBookingBlobs instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(AmReportBookingBlobs persistentInstance) {
		log.debug("deleting AmReportBookingBlobs instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReportBookingBlobs merge(AmReportBookingBlobs detachedInstance) {
		log.debug("merging AmReportBookingBlobs instance");
		try {
			AmReportBookingBlobs result = (AmReportBookingBlobs) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReportBookingBlobs findById(Integer id) {
		log.debug("getting AmReportBookingBlobs instance with id: " + id);
		try {
			AmReportBookingBlobs instance = (AmReportBookingBlobs) sessionFactory.getCurrentSession()
					.get(AmReportBookingBlobs.class, id);
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
	public List<AmReportBookingBlobs> findByExample(AmReportBookingBlobs instance) {
		log.debug("finding AmReportBookingBlobs instance by example");
		try {
			List<AmReportBookingBlobs> results = (List<AmReportBookingBlobs>) sessionFactory.getCurrentSession()
					.createCriteria(AmReportBookingBlobs.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
