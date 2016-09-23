package it.kirey.kfuture.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.BatchConfigDao;
import it.kirey.kfuture.entity.BatchConfigs;

@Repository(value = "batchDao")
@Transactional
public class BatchConfigDaoImpl implements BatchConfigDao {
	
	@Autowired
	private SessionFactory sessionFactory;

	public String findCronExpression(String idTrigger) {
		try {
			Session session = sessionFactory.getCurrentSession();
			Criteria criteria = session.createCriteria(BatchConfigs.class)
					.add(Restrictions.eq("id.category", "CRONEXP")).add(Restrictions.eq("id.value", idTrigger));
			BatchConfigs confConfigs = (BatchConfigs) criteria.uniqueResult();

			return confConfigs.getParameter();

		} catch (RuntimeException re) {
			throw re;
		}
	}

	public void updateCronExpression(String idTrigger, String cronExpression) {
		try {
			Session session = sessionFactory.getCurrentSession();
			Criteria criteria = session.createCriteria(BatchConfigs.class)
					.add(Restrictions.eq("id.category", "CRONEXP")).add(Restrictions.eq("id.value", idTrigger));

			BatchConfigs confConfigs = (BatchConfigs) criteria.uniqueResult();
			confConfigs.setParameter(cronExpression);

			session.saveOrUpdate(confConfigs);

		} catch (RuntimeException re) {
			throw re;
		}
	}
}
