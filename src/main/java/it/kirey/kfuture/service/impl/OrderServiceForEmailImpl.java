package it.kirey.kfuture.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.entity.Customer;
import it.kirey.kfuture.service.MailService;
import it.kirey.kfuture.service.OrderServiceForEmail;

@Service(value=OrderServiceForEmail.SPRING_QUALIFIER)
public class OrderServiceForEmailImpl implements OrderServiceForEmail {

	@Autowired
	MailService mailService;

	@Override
	public void sendOrderConfirmation(Customer customer) {
		mailService.sendEmail(customer);
	}

	@Override
	public Customer getCustomerDetails() {
		
		Customer customerInfo = new Customer();
		customerInfo.setName("Alexandra");
		customerInfo.setAddress("Iasi");
		customerInfo.setEmail("cnicuta@gmail.com");
		
		return customerInfo;
	}

}
