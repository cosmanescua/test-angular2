package it.kirey.kfuture.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.kirey.kfuture.dto.CustomerDto;
import it.kirey.kfuture.service.IMailService;
import it.kirey.kfuture.service.IOrderServiceForEmail;

@Service(value=IOrderServiceForEmail.SERVICE_QUALIFIER)
public class OrderServiceForEmailImpl implements IOrderServiceForEmail {

	@Autowired
	IMailService mailService;

	@Override
	public void sendOrderConfirmation(CustomerDto customer) {
		mailService.sendEmail(customer);
	}

	@Override
	public CustomerDto getCustomerDetails() {
		
		CustomerDto customerInfo = new CustomerDto();
		customerInfo.setName("Alexandra");
		customerInfo.setAddress("Iasi");
		customerInfo.setEmail("cnicuta@gmail.com");
		
		return customerInfo;
	}

}
