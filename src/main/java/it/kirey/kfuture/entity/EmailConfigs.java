package it.kirey.kfuture.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "email_configs")
public class EmailConfigs implements java.io.Serializable {
	private static final long serialVersionUID = -1077525675212778805L;
	
	@Id
	@SequenceGenerator(name = "email_conf_gen", sequenceName = "email_conf_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "email_conf_gen")
	@Column(name = "id")
	private int id;
	
	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "host", nullable = false)
	private String host;
	
	@Column(name = "port", nullable = false)
	private int port;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}
	

	
}
