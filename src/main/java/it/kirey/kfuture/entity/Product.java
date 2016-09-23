package it.kirey.kfuture.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "products")
public class Product implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2190894161669007043L;

	@Id
	@SequenceGenerator(name = "product_gen", sequenceName = "product_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_gen")
	@Column(name = "id")
	public int id;

	@Column(name = "name")
	public String name;

	@Column(name = "price")
	public Double price;

	@Column(name = "dateProduct", length = 7)
	private Date dateProduct;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Date getDateProduct() {
		return dateProduct;
	}

	public void setDateProduct(Date dateProduct) {
		this.dateProduct = dateProduct;
	}

}
