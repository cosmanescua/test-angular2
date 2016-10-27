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

import it.kirey.kfuture.entity.AmReportBookings;

/**
 * Home object for domain model class AmReportBookings.
 * @see it.kirey.kfuture.gen.AmReportBookings
 * @author Hibernate Tools
 */
@Repository(value = "amReportBookingsHome")
public class AmReportBookingsHome {

	private static final Log log = LogFactory.getLog(AmReportBookingsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public void persist(AmReportBookings transientInstance) {
		log.debug("persisting AmReportBookings instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachDirty(AmReportBookings instance) {
		log.debug("attaching dirty AmReportBookings instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void attachClean(AmReportBookings instance) {
		log.debug("attaching clean AmReportBookings instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Transactional
	public void delete(AmReportBookings persistentInstance) {
		log.debug("deleting AmReportBookings instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReportBookings merge(AmReportBookings detachedInstance) {
		log.debug("merging AmReportBookings instance");
		try {
			AmReportBookings result = (AmReportBookings) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Transactional
	public AmReportBookings findById(Integer id) {
		log.debug("getting AmReportBookings instance with id: " + id);
		try {
			AmReportBookings instance = (AmReportBookings) sessionFactory.getCurrentSession()
					.get(AmReportBookings.class, id);
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
	public List<AmReportBookings> findByExample(AmReportBookings instance) {
		log.debug("finding AmReportBookings instance by example");
		try {
			List<AmReportBookings> results = (List<AmReportBookings>) sessionFactory.getCurrentSession()
					.createCriteria(AmReportBookings.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}

