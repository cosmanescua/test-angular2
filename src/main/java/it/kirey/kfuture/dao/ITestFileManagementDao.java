package it.kirey.kfuture.dao;

import java.util.ArrayList;


import it.kirey.kfuture.entity.TestFileManagement;

public interface ITestFileManagementDao {
	public static final String SPRING_QUALIFIER = "testFileManagementDao";
	public ArrayList<TestFileManagement> getAllFiles();
	public void saveFileDetails(TestFileManagement file);
	public TestFileManagement findFileById(int id);
	
}
