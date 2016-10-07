package it.kirey.kfuture.service;

import it.kirey.kfuture.dto.CustomerDto;

public interface IMailService {
	public static final String SERVICE_QUALIFIER = "mailService";

	public void sendEmail(CustomerDto customer);
}
