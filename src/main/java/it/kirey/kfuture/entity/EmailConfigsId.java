package it.kirey.kfuture.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class EmailConfigsId implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private String value;
	private String category;

	public EmailConfigsId() {
	}

	public EmailConfigsId(String value, String category) {
		this.value = value;
		this.category = category;
	}

	@Column(name = "value", nullable = false, length = 25)
	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Column(name = "category", nullable = false, length = 200)
	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
