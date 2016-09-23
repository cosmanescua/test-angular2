package it.kirey.kfuture.service;

import it.kirey.kfuture.entity.Customer;


public interface OrderServiceForEmail {
	public static final String SPRING_QUALIFIER = "orderService";
	
	public Customer getCustomerDetails();

	public void sendOrderConfirmation(Customer customer);
	
}
