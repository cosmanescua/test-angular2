package it.kirey.kfuture.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.ITestDao;

@Repository(ITestDao.SPRING_QUALIFIER)
@Transactional(propagation = Propagation.REQUIRED)
public class TestDaoImpl implements ITestDao {

	@Override
	public void testDao() throws Exception{
		
		System.out.println("Executing dao method");
		String test = null;
		test.getBytes();
	}
}
