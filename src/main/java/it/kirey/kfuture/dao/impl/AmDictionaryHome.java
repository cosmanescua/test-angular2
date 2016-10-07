package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 13:34:35 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmDictionaryHome;
import it.kirey.kfuture.entity.AmDictionary;


/**
 * Home object for domain model class AmDictionary.
 * 
 * @see it.kirey.kfuture.gen.AmDictionary
 * @author Hibernate Tools
 */
@Repository(value = IAmDictionaryHome.REPOSITORY_QUALIFIER)
public class AmDictionaryHome implements IAmDictionaryHome {

	private static final Log log = LogFactory.getLog(AmDictionaryHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmDictionary transientInstance) {
		log.debug("persisting AmDictionary instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}
	@Override
	public void attachDirty(AmDictionary instance) {
		log.debug("attaching dirty AmDictionary instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
	
	@Override
	public void attachClean(AmDictionary instance) {
		log.debug("attaching clean AmDictionary instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
	
	@Override
	public void delete(AmDictionary persistentInstance) {
		log.debug("deleting AmDictionary instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
	
	@Override
	public AmDictionary merge(AmDictionary detachedInstance) {
		log.debug("merging AmDictionary instance");
		try {
			AmDictionary result = (AmDictionary) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmDictionary findById(java.lang.String id) {
		log.debug("getting AmDictionary instance with id: " + id);
		try {
			AmDictionary instance = (AmDictionary) sessionFactory.getCurrentSession().get(AmDictionary.class, id);
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

	public List<AmDictionary> findByExample(AmDictionary instance) {
		log.debug("finding AmDictionary instance by example");
		try {
			List<AmDictionary> results = (List<AmDictionary>) sessionFactory.getCurrentSession()
					.createCriteria(AmDictionary.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	
	@Cacheable(cacheNames="dictionary") 
	@Override
	public List<AmDictionary> getAll() {
		return (List<AmDictionary>) this.sessionFactory.getCurrentSession().createCriteria(AmDictionary.class).list();
	}

	@Override
	public List<AmDictionary> findByCategory(String lang, String category) { 
		return (List<AmDictionary>)this.sessionFactory.getCurrentSession().createCriteria(AmDictionary.class, "dictionary")
				.createAlias("dictionary.resource", "resource")
				.add(Restrictions.eq("dictionary.category", category))
				.add(Restrictions.eq("resource", lang))
				.list();
	}
	
}
