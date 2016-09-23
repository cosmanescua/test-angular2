package it.kirey.kfuture.service;

import it.kirey.kfuture.entity.Customer;

public interface MailService {
	public static final String SPRING_QUALIFIER = "mailService";

	public void sendEmail(Customer customer);
}
