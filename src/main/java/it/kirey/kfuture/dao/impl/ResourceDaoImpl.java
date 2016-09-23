package it.kirey.kfuture.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IResourceDao;
import it.kirey.kfuture.entity.ResourceBundle;

@Repository(value = IResourceDao.SPRING_QUALIFIER)
public class ResourceDaoImpl implements IResourceDao{
	
	@Autowired
	private SessionFactory sessionFactory;

	//caches ResourceBundle object
	@Override
	@Cacheable(cacheNames = "property")
	public List<ResourceBundle> getResourceByLang(String langCode) {
		
		List<ResourceBundle> resourceList = (List<ResourceBundle>) this.sessionFactory
				.getCurrentSession()
				.createCriteria(ResourceBundle.class)
				.add(Restrictions.eq("langCode", langCode))
				.list();
		return resourceList;
	}
	
	
	//delete all entries from cache
	@CacheEvict(value = "property", allEntries=true)
	@Override
	public  ResourceBundle saveResource(ResourceBundle rb) {
		return (ResourceBundle) this.sessionFactory.getCurrentSession().merge(rb);
	}

}
