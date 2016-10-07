package it.kirey.kfuture.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.dao.ITestExceptionsDao;

@Service(value = ITestService.SERVICE_QUALIFIER)
public class TestServiceImpl implements ITestService{

	@Autowired 
	ITestExceptionsDao testExceptionDao;
	
	@Override
	public void testExceptionMethod() {
		System.out.println("This is a test exception method in Service");
		testExceptionDao.testExceptionDaoMethod();
	}

	
	
}
