package it.kirey.kfuture.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="comp_companies")
public class Companies implements Serializable{

	private static final long serialVersionUID = -3076958267207650908L;

	@Id
	@SequenceGenerator(name = "idCompany_gen", sequenceName = "idCompany_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idCompany_gen")
	@Column(name = "idCompany")
	private Integer idCompany;

	@Column(name = "cdCompany")
	private String cdCompany;

	@Column(name = "dscCompany")
	private String dscCompany;
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "companies")	
	private Set<User> users;

	public Integer getIdCompany() {
		return idCompany;
	}

	public void setIdCompany(Integer idCompany) {
		this.idCompany = idCompany;
	}

	public String getCdCompany() {
		return cdCompany;
	}

	public void setCdCompany(String cdCompany) {
		this.cdCompany = cdCompany;
	}

	public String getDscCompany() {
		return dscCompany;
	}

	public void setDscCompany(String dscCompany) {
		this.dscCompany = dscCompany;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}
