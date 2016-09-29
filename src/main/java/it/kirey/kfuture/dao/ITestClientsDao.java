package it.kirey.kfuture.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import it.kirey.kfuture.entity.TestClients;

public interface ITestClientsDao{

	public static final String SPRING_QUALIFIER = "testClientsDao";
	public TestClients saveClient(TestClients client);
	public void updateClient(TestClients client);
	public TestClients findClientById(int id);
	public ArrayList<TestClients> getAllClients();
	public void deleteClientById(int id);
	
}
