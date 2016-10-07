package it.kirey.kfuture.dao.impl;

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmJobTracesHome;
import it.kirey.kfuture.entity.AmJobTraces;

/**
 * Home object for domain model class AmJobTraces.
 * 
 * @see .AmJobTraces
 * @author Hibernate Tools
 */
@Repository(value = IAmJobTracesHome.REPOSITORY_QUALIFIER)
public class AmJobTracesHome implements IAmJobTracesHome {

	private static final Log log = LogFactory.getLog(AmJobTracesHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public Integer countJobTraces(String schedulerName, String jobStatus) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AmJobTraces.class)
				.add(Restrictions.eq("amTaskSchedulers.name", schedulerName)).add(Restrictions.eq("status", jobStatus));
		return new Integer(((Number) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue());
	}

	public void persist(AmJobTraces transientInstance) {
		log.debug("persisting AmJobTraces instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmJobTraces instance) {
		log.debug("attaching dirty AmJobTraces instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmJobTraces instance) {
		log.debug("attaching clean AmJobTraces instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmJobTraces persistentInstance) {
		log.debug("deleting AmJobTraces instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmJobTraces merge(AmJobTraces detachedInstance) {
		log.debug("merging AmJobTraces instance");
		try {
			AmJobTraces result = (AmJobTraces) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmJobTraces findById(Integer id) {
		log.debug("getting AmJobTraces instance with id: " + id);
		try {
			AmJobTraces instance = (AmJobTraces) sessionFactory.getCurrentSession()
					.get(AmJobTraces.class, id);
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

	public List<AmJobTraces> findByExample(AmJobTraces instance) {
		log.debug("finding AmJobTraces instance by example");
		try {
			List<AmJobTraces> results = (List<AmJobTraces>) sessionFactory.getCurrentSession()
					.createCriteria(AmJobTraces.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
