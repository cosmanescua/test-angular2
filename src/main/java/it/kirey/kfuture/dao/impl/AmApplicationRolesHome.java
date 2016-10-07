package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 10:23:13 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmApplicationRolesHome;
import it.kirey.kfuture.entity.AmApplicationRoles;

/**
 * Home object for domain model class AmApplicationRoles.
 * 
 * @see it.kirey.kfuture.gen.AmApplicationRoles
 * @author Hibernate Tools
 */
@Repository(value = IAmApplicationRolesHome.REPOSITORY_QUALIFIER)
public class AmApplicationRolesHome implements IAmApplicationRolesHome {

	private static final Log log = LogFactory.getLog(AmApplicationRolesHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	public void persist(AmApplicationRoles transientInstance) {
		log.debug("persisting AmApplicationRoles instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(AmApplicationRoles instance) {
		log.debug("attaching dirty AmApplicationRoles instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(AmApplicationRoles instance) {
		log.debug("attaching clean AmApplicationRoles instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(AmApplicationRoles persistentInstance) {
		log.debug("deleting AmApplicationRoles instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public AmApplicationRoles merge(AmApplicationRoles detachedInstance) {
		log.debug("merging AmApplicationRoles instance");
		try {
			AmApplicationRoles result = (AmApplicationRoles) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public AmApplicationRoles findById(Integer id) {
		log.debug("getting AmApplicationRoles instance with id: " + id);
		try {
			AmApplicationRoles instance = (AmApplicationRoles) sessionFactory.getCurrentSession()
					.get(AmApplicationRoles.class, id);
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

	public List<AmApplicationRoles> findByExample(AmApplicationRoles instance) {
		log.debug("finding AmApplicationRoles instance by example");
		try {
			List<AmApplicationRoles> results = (List<AmApplicationRoles>) sessionFactory.getCurrentSession()
					.createCriteria(AmApplicationRoles.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	@Override
	public Set<AmApplicationRoles> getRolesByUsername(String username) {
		//List<AmApplicationRoles> roleList = sessionFactory.getCurrentSession().createCriteria(AmApplicationRoles.class).add(Restrictions.eq("", value))
		return null;
	}
}
