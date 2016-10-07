package it.kirey.kfuture.dao.impl;

// Generated Sep 22, 2016 3:16:46 PM by Hibernate Tools 5.1.0.CR1

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmEmailTemplatesHome;
import it.kirey.kfuture.entity.AmEmailTemplates;

import static org.hibernate.criterion.Example.create;

/**
 * Home object for domain model class AmEmailTemplates.
 * @see .AmEmailTemplates
 * @author Hibernate Tools
 */
@Repository(value = IAmEmailTemplatesHome.SPRING_QUALIFIER)
@Transactional
public class AmEmailTemplatesHome implements IAmEmailTemplatesHome{

	private static final Log log = LogFactory.getLog(AmEmailTemplatesHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmEmailTemplates transientInstance) {
		log.debug("persisting AmEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(AmEmailTemplates instance) {
		log.debug("attaching dirty AmEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmEmailTemplates instance) {
		log.debug("attaching clean AmEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmEmailTemplates persistentInstance) {
		log.debug("deleting AmEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public AmEmailTemplates merge(AmEmailTemplates detachedInstance) {
		log.debug("merging AmEmailTemplates instance");
		try {
			AmEmailTemplates result = (AmEmailTemplates) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmEmailTemplates findById(Integer id) {
		log.debug("getting AmEmailTemplates instance with id: " + id);
		try {
			AmEmailTemplates instance = (AmEmailTemplates) sessionFactory.getCurrentSession().get(AmEmailTemplates.class,
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

	@SuppressWarnings("unchecked")
	@Override
	public List<AmEmailTemplates> findByExample(AmEmailTemplates instance) {
		log.debug("finding AmEmailTemplates instance by example");
		try {
			List<AmEmailTemplates> results = (List<AmEmailTemplates>) sessionFactory.getCurrentSession()
					.createCriteria("AmEmailTemplates").add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	@Override
	public AmEmailTemplates getEmailTemplate(String templateName) {
		AmEmailTemplates template = (AmEmailTemplates) this.sessionFactory.getCurrentSession()
				.createCriteria(AmEmailTemplates.class).add(Restrictions.eq("name", templateName)).uniqueResult();
		return template;
	}
}
