package it.kirey.kfuture.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ITestCacheDao;
import it.kirey.kfuture.entity.AmErrorLogs;

@Repository(value=ITestCacheDao.REPOSITORY_QUALIFIER)
public class TestCacheDaoImpl implements ITestCacheDao{

	@Autowired
	private SessionFactory sessionFactory;

	@SuppressWarnings("unchecked")
	@Override
	public List<AmErrorLogs> getAllErrorLogs() {

		return (List<AmErrorLogs>) this.sessionFactory.getCurrentSession().createCriteria(AmErrorLogs.class).list();
	}

	@Override
	public void cacheEvict() {
	System.out.println("______________________   cacheEvict");
	}
	
}
