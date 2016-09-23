package it.kirey.kfuture.service.impl;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ILoggerDao;
import it.kirey.kfuture.dao.ITestDao;
import it.kirey.kfuture.service.ITestService;


@Repository(value=ITestService.SPRING_QUALIFIER)
public class TestServiceImpl implements ITestService {

	@Autowired ITestDao testDao;
	
	@Override
	public void testMethod() throws Exception //throws FileNotFoundException 
	{
		System.out.println("I'm test service method");
		testDao.testDao();
	}

}
