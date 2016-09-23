package it.kirey.kfuture.dao.impl;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ReportParamDao;
import it.kirey.kfuture.entity.ReportParameter;

@Repository(value="reportParamDao")
public class ReportParamDaoImpl implements ReportParamDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void saveOrUpdate(ReportParameter param) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(param);
	}
	
	@Override
	public ReportParameter getById(Integer id) {
		return (ReportParameter)this.sessionFactory.getCurrentSession().createCriteria(ReportParameter.class).add(Restrictions.idEq(id)).uniqueResult();
	}
}
