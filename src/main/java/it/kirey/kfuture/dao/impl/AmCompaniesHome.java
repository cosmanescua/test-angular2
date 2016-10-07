package it.kirey.kfuture.dao.impl;
// Generated 29-Sep-2016 11:26:38 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmCompaniesHome;
import it.kirey.kfuture.entity.AmCompanies;

/**
 * Home object for domain model class AmCompanies.
 * @see it.kirey.kfuture.gen.AmCompanies
 * @author Hibernate Tools
 */
@Repository(value = IAmCompaniesHome.REPOSITORY_QUALIFIER)
public class AmCompaniesHome implements IAmCompaniesHome{

	private static final Log log = LogFactory.getLog(AmCompaniesHome.class);
	@Autowired
	private SessionFactory sessionFactory;

	public void persist(AmCompanies transientInstance) {
		log.debug("persisting AmCompanies instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmCompanies instance) {
		log.debug("attaching dirty AmCompanies instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmCompanies instance) {
		log.debug("attaching clean AmCompanies instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmCompanies persistentInstance) {
		log.debug("deleting AmCompanies instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmCompanies merge(AmCompanies detachedInstance) {
		log.debug("merging AmCompanies instance");
		try {
			AmCompanies result = (AmCompanies) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmCompanies findById(Integer id) {
		log.debug("getting AmCompanies instance with id: " + id);
		try {
			AmCompanies instance = (AmCompanies) sessionFactory.getCurrentSession()
					.get(AmCompanies.class, id);
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

	public List<AmCompanies> findByExample(AmCompanies instance) {
		log.debug("finding AmCompanies instance by example");
		try {
			List<AmCompanies> results = (List<AmCompanies>) sessionFactory.getCurrentSession()
					.createCriteria(AmCompanies.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
