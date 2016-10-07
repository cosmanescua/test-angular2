package it.kirey.kfuture.dao.impl;
// default package
// Generated Sep 22, 2016 3:16:46 PM by Hibernate Tools 5.1.0.CR1

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmEmailConfigsHome;
import it.kirey.kfuture.entity.AmEmailConfigs;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class AmEmailConfigs.
 * @see .AmEmailConfigs
 * @author Hibernate Tools
 */
@Repository(value = IAmEmailConfigsHome.SPRING_QUALIFIER)
@Transactional
public class AmEmailConfigsHome implements IAmEmailConfigsHome {

	private static final Log log = LogFactory.getLog(AmEmailConfigsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmEmailConfigs transientInstance) {
		log.debug("persisting AmEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(AmEmailConfigs instance) {
		log.debug("attaching dirty AmEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmEmailConfigs instance) {
		log.debug("attaching clean AmEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmEmailConfigs persistentInstance) {
		log.debug("deleting AmEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmEmailConfigs merge(AmEmailConfigs detachedInstance) {
		log.debug("merging AmEmailConfigs instance");
		try {
			AmEmailConfigs result = (AmEmailConfigs) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}
	
	@Override
	public AmEmailConfigs findById(Integer id) {
		log.debug("getting AmEmailConfigs instance with id: " + id);
		try {
			AmEmailConfigs instance = (AmEmailConfigs) sessionFactory.getCurrentSession().get(AmEmailConfigs.class, id);
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
	
	@SuppressWarnings("unchecked")
	@Override
	public List<AmEmailConfigs> findByExample(AmEmailConfigs instance) {
		log.debug("finding AmEmailConfigs instance by example");
		try {
			List<AmEmailConfigs> results = (List<AmEmailConfigs>) sessionFactory.getCurrentSession()
					.createCriteria("AmEmailConfigs").add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	@Override
	public AmEmailConfigs getEmailConfigs() {

		AmEmailConfigs emailConfigs = (AmEmailConfigs) this.sessionFactory.getCurrentSession()
				.createCriteria(AmEmailConfigs.class).uniqueResult();

		return emailConfigs;
	}
}
