package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 10:23:13 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmReportBlobsHome;
import it.kirey.kfuture.entity.AmReportBlobs;
import it.kirey.kfuture.entity.AmReports;

/**
 * Home object for domain model class AmReportBlobs.
 * 
 * @see it.kirey.kfuture.gen.AmReportBlobs
 * @author Hibernate Tools
 */
@Repository(value = IAmReportBlobsHome.REPOSITORY_QUALIFIER)
public class AmReportBlobsHome implements IAmReportBlobsHome {

	private static final Log log = LogFactory.getLog(AmReportBlobsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public AmReportBlobs getBlobFileByReportId(Integer reportId) {
		AmReports rep = (AmReports) sessionFactory.getCurrentSession().createCriteria(AmReports.class)
				.add(Restrictions.eq("id", reportId)).uniqueResult();
		return (AmReportBlobs) sessionFactory.getCurrentSession().createCriteria(AmReportBlobs.class)
				.add(Restrictions.eq("report", rep)).uniqueResult();
	}

	@Override
	public void persist(AmReportBlobs transientInstance) {
		log.debug("persisting AmReportBlobs instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmReportBlobs instance) {
		log.debug("attaching dirty AmReportBlobs instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmReportBlobs instance) {
		log.debug("attaching clean AmReportBlobs instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmReportBlobs persistentInstance) {
		log.debug("deleting AmReportBlobs instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmReportBlobs merge(AmReportBlobs detachedInstance) {
		log.debug("merging AmReportBlobs instance");
		try {
			AmReportBlobs result = (AmReportBlobs) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmReportBlobs findById(Integer id) {
		log.debug("getting AmReportBlobs instance with id: " + id);
		try {
			AmReportBlobs instance = (AmReportBlobs) sessionFactory.getCurrentSession()
					.get(AmReportBlobs.class, id);
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

	public List<AmReportBlobs> findByExample(AmReportBlobs instance) {
		log.debug("finding AmReportBlobs instance by example");
		try {
			List<AmReportBlobs> results = (List<AmReportBlobs>) sessionFactory.getCurrentSession()
					.createCriteria(AmReportBlobs.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
