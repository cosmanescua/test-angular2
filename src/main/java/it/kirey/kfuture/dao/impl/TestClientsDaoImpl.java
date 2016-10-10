package it.kirey.kfuture.dao.impl;
// default package
// Generated 26-Sep-2016 09:56:56 by Hibernate Tools 5.2.0.Beta1

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.hibernate.SessionFactory;

import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.ITestClientsDao;
import it.kirey.kfuture.entity.TestClients;

/**
 * Home object for domain model class TestClients.
 * @see .TestClients
 * @author Hibernate Tools
 */

//this class contains methods for performing operations (CRUD) on the database
//the table used is TestClients

@Repository(ITestClientsDao.SPRING_QUALIFIER)
@Transactional
public class TestClientsDaoImpl implements ITestClientsDao {

	private static final Log log = LogFactory.getLog(TestClientsDaoImpl.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public TestClients findClientById(int id) {
		return (TestClients) sessionFactory.getCurrentSession().createCriteria(TestClients.class).add(Restrictions.idEq(id))
				.uniqueResult();
	}
	@Override
	public ArrayList<TestClients> getAllClients() {

		ArrayList<TestClients> res = (ArrayList<TestClients>)
				sessionFactory.getCurrentSession().createCriteria(TestClients.class)
				.list();
		return res;
	}
	@Override
	public void deleteClientById(int id){
		TestClients client = this.findClientById(id);
		sessionFactory.getCurrentSession().delete(client);
	}
	@Override
	public TestClients saveClient(TestClients client) {
		int id=(int)sessionFactory.getCurrentSession().save(client);
		return findClientById(id);
	}
	@Override
	public void updateClient(TestClients client) {
		sessionFactory.getCurrentSession().update(client);
	}
}
