package it.kirey.kfuture.dao.impl;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IEmailingDao;
import it.kirey.kfuture.entity.EmailConfigs;
import it.kirey.kfuture.entity.EmailTemplate;

@Repository(value = IEmailingDao.SPRING_QUALIFIER)
@Transactional
public class EmailingDao implements IEmailingDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public EmailConfigs getEmailConfigs() {

		EmailConfigs emailConfigs = (EmailConfigs) this.sessionFactory.getCurrentSession()
				.createCriteria(EmailConfigs.class).uniqueResult();

		return emailConfigs;
	}

	@Override
	public EmailTemplate getEmailTemplate(String templateName) {
		EmailTemplate template = (EmailTemplate) this.sessionFactory.getCurrentSession()
				.createCriteria(EmailTemplate.class).add(Restrictions.eq("templateName", templateName)).uniqueResult();
		return template;
	}

}
