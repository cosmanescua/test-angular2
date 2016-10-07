package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 13:34:35 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IAmProductsHome;
import it.kirey.kfuture.dto.FilterDto;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;
import it.kirey.kfuture.util.Utilities;
import oracle.net.aso.h;

/**
 * Home object for domain model class AmProducts.
 * 
 * @see it.kirey.kfuture.gen.AmProducts
 * @author Hibernate Tools
 */

@Repository(IAmProductsHome.REPOSITORY_QUALIFIER)
public class AmProductsHome implements IAmProductsHome {

	private static final Log log = LogFactory.getLog(AmProductsHome.class);

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void persist(AmProducts transientInstance) {
		log.debug("persisting AmProducts instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	@Override
	public void attachDirty(AmProducts instance) {
		log.debug("attaching dirty AmProducts instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void attachClean(AmProducts instance) {
		log.debug("attaching clean AmProducts instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	@Override
	public void delete(AmProducts persistentInstance) {
		log.debug("deleting AmProducts instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public List<AmProducts> getAll() {
		return (List<AmProducts>) this.sessionFactory.getCurrentSession().createCriteria(AmProducts.class).list();
	}

	public AmProducts merge(AmProducts detachedInstance) {
		log.debug("merging AmProducts instance");
		try {
			AmProducts result = (AmProducts) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	@Override
	public AmProducts findById(Integer id) {
		log.debug("getting AmProducts instance with id: " + id);
		try {
			AmProducts instance = (AmProducts) sessionFactory.getCurrentSession().get(AmProducts.class, id);
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

	public List<AmProducts> findByExample(AmProducts instance) {
		log.debug("finding AmProducts instance by example");
		try {
			List<AmProducts> results = (List<AmProducts>) sessionFactory.getCurrentSession()
					.createCriteria(AmProducts.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}

	}

	@Override
	public List<AmProducts> getAll(PaginationDto paginationDto) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("from AmProducts as product ");
		hqlSB.append(Utilities.geneneratePaginationQuery(paginationDto));
		hqlSB.append(Utilities.generateOrderByQuery(paginationDto));
		
		return (List<AmProducts>) sessionFactory.getCurrentSession().createQuery(hqlSB.toString())
				.setFirstResult((paginationDto.getPage() - 1) * paginationDto.getPageSize())
				.setMaxResults(paginationDto.getPageSize()).list();
	}

	@Override
	public Long getTotalProductRows(PaginationDto paginationDto) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("select count(*) from AmProducts as product ");
		hqlSB.append(Utilities.geneneratePaginationQuery(paginationDto));
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hqlSB.toString()).uniqueResult();
		return count;
	}

}
