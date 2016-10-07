package it.kirey.kfuture.service;

import it.kirey.kfuture.dto.CustomerDto;

public interface IOrderServiceForEmail {
	public static final String SERVICE_QUALIFIER = "orderService";

	public CustomerDto getCustomerDetails();

	public void sendOrderConfirmation(CustomerDto customer);

}
