package it.kirey.kfuture.dao.impl;

import java.util.ArrayList;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.ITestFileManagementDao;
import it.kirey.kfuture.entity.TestFileManagement;

@Repository(ITestFileManagementDao.SPRING_QUALIFIER)
@Transactional
public class TestFileManagementDao implements ITestFileManagementDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public ArrayList<TestFileManagement> getAllFiles() {
		ArrayList<TestFileManagement> res=(ArrayList<TestFileManagement>)sessionFactory.getCurrentSession().createCriteria(TestFileManagement.class).list();
		return res;
	}

	@Override
	public void saveFileDetails(TestFileManagement file) {
		sessionFactory.getCurrentSession().save(file);
	}
	@Override
	public TestFileManagement findFileById(int id){
		return (TestFileManagement)sessionFactory.getCurrentSession().createCriteria(TestFileManagement.class).add(Restrictions.idEq(id)).uniqueResult();
	}
	
}
