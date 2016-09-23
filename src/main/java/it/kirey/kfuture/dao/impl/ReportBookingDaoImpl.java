package it.kirey.kfuture.dao.impl;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.ReportBookingDao;
import it.kirey.kfuture.entity.ReportBooking;

@Repository(value="reportBookingDao")
public class ReportBookingDaoImpl implements ReportBookingDao {
	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void saveOrUpdate(ReportBooking rb) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(rb);
	}
	
	@Override
	public ReportBooking getById(Integer id) {
		return (ReportBooking)this.sessionFactory.getCurrentSession().createCriteria(ReportBooking.class).add(Restrictions.idEq(id)).uniqueResult();
	}
}
