package it.kirey.kfuture.dao.impl;
// Generated 23-Sep-2016 13:34:35 by Hibernate Tools 5.1.0.Beta1

import static org.hibernate.criterion.Example.create;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dto.FilterDto;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmProducts;
import it.kirey.kfuture.util.Translation;
import it.kirey.kfuture.util.Utilities;

/**
 * Home object for domain model class AmProducts.
 * 
 * @see it.kirey.kfuture.gen.AmProducts
 * @author Hibernate Tools
 */

@Repository(value = "amProductsHome")
public class AmProductsHome {

	private static final Log log = LogFactory.getLog(AmProductsHome.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private Translation translation;

	@Transactional
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

	@Transactional
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

	@Transactional
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

	@Transactional
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

/*	public List<AmProducts> findAll() {
		return (List<AmProducts>) this.sessionFactory.getCurrentSession().createCriteria(AmProducts.class).list();
	}*/

	@Transactional
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

	@Transactional
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

	@Transactional
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

	@SuppressWarnings("unchecked")
	@Transactional
	public List<AmProducts> findAllPaginated(PaginationDto paginationDto) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		
		String lang = translation.getUsersDefaultLang(); 
		paginationDto.getSort().setField("nameGenericName");
		
		hqlSB.append("select p.id as id, nvl(nvl(r.translation, d.defaultTranslation), p.nameGenericName) as nameGenericName "
				+ " from AmProducts as p "
				+ "left join AmDictionary as d on d.genericName = p.nameGenericName "
				+ "left join AmResourceBundle r on r.amDictionary.genericName =  p.nameGenericName and r.language = '"+lang+"' ");
		
		if (paginationDto.getFilterList().size() != 0) {
			Iterator<FilterDto> filterList = paginationDto.getFilterList().iterator();
			hqlSB.append("where ");
			while (filterList.hasNext()) {
						FilterDto filter = filterList.next();
						//if String
						if (filter.getQuery() instanceof String) {
							hqlSB.append("lower(");
							//hqlSB.append(filter.getField());
							hqlSB.append("nvl(nvl(r.translation, d.defaultTranslation), p."+filter.getField()+")");
							hqlSB.append(") like '%");
							hqlSB.append(filter.getQuery().toString().toLowerCase());
							hqlSB.append("%' ");
						//if Date
						} else if (filter.getQuery() instanceof Long) {
							hqlSB.append(filter.getField());
							hqlSB.append(" = to_date('");
							hqlSB.append(new Date((Long) filter.getQuery()));
							hqlSB.append("','YYYY-MM-DD') ");
						//Number
						} else {
							hqlSB.append(filter.getField());
							hqlSB.append(" = ");
							hqlSB.append(filter.getQuery());
							hqlSB.append(" ");
						}
						if (filterList.hasNext()) {
							hqlSB.append(" and ");
						}
					}
		}	
		
		if (paginationDto.getSort().getField() != null) {
			hqlSB.append("order by nvl(nvl(r.translation, d.defaultTranslation), p."+paginationDto.getSort().getField()+") "+paginationDto.getSort().getType());
		}
		
		List<AmProducts> result = sessionFactory.getCurrentSession().createQuery(hqlSB.toString())
		.setResultTransformer(Transformers.aliasToBean(AmProducts.class))
		.setFirstResult((paginationDto.getPage() - 1) * paginationDto.getPageSize())
		.setMaxResults(paginationDto.getPageSize()).list();		
		return result;
	}
	
	@Transactional
	public Long findTotalProductRows(PaginationDto paginationDto) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		//hqlSB.append("select count(*) from AmProducts as product ");
		String lang = translation.getUsersDefaultLang(); 
		paginationDto.getSort().setField("nameGenericName");
		
		hqlSB.append("select count(*)"
				+ " from AmProducts as p "
				+ "left join AmDictionary as d on d.genericName = p.nameGenericName "
				+ "left join AmResourceBundle r on r.amDictionary.genericName =  p.nameGenericName and r.language = '"+lang+"' ");
		
		if (paginationDto.getFilterList().size() != 0) {
			Iterator<FilterDto> filterList = paginationDto.getFilterList().iterator();
			hqlSB.append("where ");
			while (filterList.hasNext()) {
						FilterDto filter = filterList.next();
						//if String
						if (filter.getQuery() instanceof String) {
							hqlSB.append("lower(");
							//hqlSB.append(filter.getField());
							hqlSB.append("nvl(nvl(r.translation, d.defaultTranslation), p."+filter.getField()+")");
							hqlSB.append(") like '%");
							hqlSB.append(filter.getQuery().toString().toLowerCase());
							hqlSB.append("%' ");
						//if Date
						} else if (filter.getQuery() instanceof Long) {
							hqlSB.append(filter.getField());
							hqlSB.append(" = to_date('");
							hqlSB.append(new Date((Long) filter.getQuery()));
							hqlSB.append("','YYYY-MM-DD') ");
						//Number
						} else {
							hqlSB.append(filter.getField());
							hqlSB.append(" = ");
							hqlSB.append(filter.getQuery());
							hqlSB.append(" ");
						}
						if (filterList.hasNext()) {
							hqlSB.append(" and ");
						}
					}
			}
		
		//hqlSB.append(Utilities.geneneratePaginationQuery(paginationDto));
		Long count = (Long) sessionFactory.getCurrentSession().createQuery(hqlSB.toString()).uniqueResult();
		return count;
	}

}
