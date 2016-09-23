package it.kirey.kfuture.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "resource_bundle", uniqueConstraints = @UniqueConstraint(columnNames = { "key", "category", "lang_code" }))
public class ResourceBundle implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4017622321917215588L;

	@Id
	@SequenceGenerator(name = "resourcebundle_gen", sequenceName = "resourcebundle_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resourcebundle_gen")
	@Column(name = "id")
	private Integer id;

	@NotNull
	@NotEmpty
	@Column(name = "key")
	private String key;

	@NotNull
	@NotEmpty
	@Column(name = "value")
	private String value;

	@NotNull
	@NotEmpty
	@Column(name = "category")
	private String category;
	
	@NotNull
	@NotEmpty
	@Column(name = "lang_code")
	private String langCode;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLangCode() {
		return langCode;
	}

	public void setLangCode(String langCode) {
		this.langCode = langCode;
	} 

}
