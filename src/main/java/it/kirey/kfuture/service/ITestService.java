package it.kirey.kfuture.service;

import java.io.FileNotFoundException;

public interface ITestService {
	public static final String SPRING_QUALIFIER = "testService";
	public void testMethod() throws Exception;
	
}
