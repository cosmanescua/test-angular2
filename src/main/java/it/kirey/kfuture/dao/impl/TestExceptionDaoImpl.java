package it.kirey.kfuture.dao.impl;

import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ITestExceptionsDao;

@Repository(value=ITestExceptionsDao.REPOSITORY_QUALIFIER)
public class TestExceptionDaoImpl implements ITestExceptionsDao {

	@Override
	public void testExceptionDaoMethod() {
		System.out.println("This is exception dao method");
		String s = null;
		s.getBytes();
	}

}
