package it.kirey.kfuture.dao.impl;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ReportParamValueDao;
import it.kirey.kfuture.entity.ReportParameterValue;

@Repository(value="reportParamValueDao")
public class ReportParamValueDaoImpl implements ReportParamValueDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void saveOrUpdate(ReportParameterValue rpv) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(rpv);
	}
	
	@Override
	public ReportParameterValue getById(Integer id) {
		return (ReportParameterValue)this.sessionFactory.getCurrentSession().createCriteria(ReportParameterValue.class).add(Restrictions.idEq(id)).uniqueResult();
	}
}
