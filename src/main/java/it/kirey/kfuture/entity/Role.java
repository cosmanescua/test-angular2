package it.kirey.kfuture.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Role implements Serializable {
	private static final long serialVersionUID = 3722937839563997026L;

	@Id
	@SequenceGenerator(name = "role_gen", sequenceName = "role_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_gen")
	@Column(name = "id")
	private Integer id;

	@Column(name = "role")
	private String role;

	@Column(name = "timeout")
	private Long timeout;

	@ManyToMany(mappedBy = "roles")	
	private Set<User> users;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	public Long getTimeout() {
		return timeout;
	}

	public void setTimeout(Long timeout) {
		this.timeout = timeout;
	}

	public Set<User> getUsers() {
		return users;
	}
	

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}
