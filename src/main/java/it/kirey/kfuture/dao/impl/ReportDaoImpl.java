package it.kirey.kfuture.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import it.kirey.kfuture.dao.IReportDao;
import it.kirey.kfuture.entity.Report;
import it.kirey.kfuture.entity.ReportBlob;
import it.kirey.kfuture.entity.ReportBooking;

@Repository(IReportDao.SPRING_QUALIFIER)
public class ReportDaoImpl implements IReportDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List<Report> getAllReports() {

		List<Report> res1 = (List<Report>)
				sessionFactory.getCurrentSession().createCriteria(Report.class)
				//.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.list();
	
		return res1;

	}
	
	@Override
	public List<ReportBooking> getAllReportsBooking() {

		List<ReportBooking> res1 = (List<ReportBooking>)
				sessionFactory.getCurrentSession().createCriteria(ReportBooking.class)
				.list();
	
		return res1;

	}

	public Report findReportById(Integer reportId) {
		return (Report) sessionFactory.getCurrentSession().createCriteria(Report.class)
				.add(Restrictions.eq("id", reportId)).uniqueResult();

	}

	@Override
	public ReportBlob findBlobFileByReport(Integer reportId) {
		 Report rep = (Report) sessionFactory.getCurrentSession().createCriteria(Report.class)
				.add(Restrictions.eq("id", reportId)).uniqueResult();
		 return (ReportBlob) sessionFactory.getCurrentSession().createCriteria(ReportBlob.class)
					.add(Restrictions.eq("report", rep)).uniqueResult();
	}


	@Override
	public void saveReportBlob(ReportBlob blob) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(blob);
	}

	@Override
	public void saveReport(Report report) {
		this.sessionFactory.getCurrentSession().saveOrUpdate(report);
	}
}
