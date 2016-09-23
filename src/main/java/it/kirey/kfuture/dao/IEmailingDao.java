package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.EmailConfigs;
import it.kirey.kfuture.entity.EmailTemplate;

public interface IEmailingDao {

	public static final String SPRING_QUALIFIER = "emailingDao";
	
	public EmailConfigs getEmailConfigs();
	
	public EmailTemplate getEmailTemplate(String templateName);

}
