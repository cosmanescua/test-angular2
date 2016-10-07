package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmEmailTemplates;

public interface IAmEmailTemplatesHome {
	
	public static final String SPRING_QUALIFIER = "amEmailTemplatesHome";
	
	public AmEmailTemplates getEmailTemplate(String templateName);

	void persist(AmEmailTemplates transientInstance);

	void attachDirty(AmEmailTemplates instance);

	void attachClean(AmEmailTemplates instance);

	void delete(AmEmailTemplates persistentInstance);

	AmEmailTemplates merge(AmEmailTemplates detachedInstance);

	AmEmailTemplates findById(Integer id);

	List<AmEmailTemplates> findByExample(AmEmailTemplates instance);
}
