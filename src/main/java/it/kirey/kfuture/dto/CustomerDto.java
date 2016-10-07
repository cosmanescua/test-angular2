package it.kirey.kfuture.dto;

import java.io.Serializable;

public class CustomerDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9213959388339008713L;

	private String name;

	private String address;

	private String email;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Customer [name=" + name + ", address=" + address + ", email=" + email + "]";
	}

}
