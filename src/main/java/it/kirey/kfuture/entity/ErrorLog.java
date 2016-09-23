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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "error_logs")
// @JsonIgnoreProperties( { "stackTrace" , "suppressed", "localizedMessage",
// "cause", "stackTrace" })
public class ErrorLog implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5559936616709669925L;

	@Id
	@SequenceGenerator(name = "err_log_gen", sequenceName = "err_log_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "err_log_gen")
	@Column(name = "id")
	private Integer id;

	// username of user who was logged when error occured
	@Column(name = "username", nullable = false)
	private String username;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_thrown", nullable = false)
	private Date dateThrown;

	//contains exception caugth name like NullPointerException or FileNotFoundException
	@Column(name = "error_name", nullable = false) 
	private String errorName;

	// contains string that is the first line of stacktrace (for now)- the place
	// in the code where exception was caught
	@Column(name = "message", nullable = false)
	private String message;
	
	@Column(name = "invoking_url", nullable = false)
	private String invokingUrl;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getDateThrown() {
		return dateThrown;
	}

	public void setDateThrown(Date dateThrown) {
		this.dateThrown = dateThrown;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getErrorName() {
		return errorName;
	}

	public void setErrorName(String errorName) {
		this.errorName = errorName;
	}

	public String getInvokingUrl() {
		return invokingUrl;
	}

	public void setInvokingUrl(String invokingUrl) {
		this.invokingUrl = invokingUrl;
	}

	@Override
	public String toString() {
		return "ErrorLog [id=" + id + ", username=" + username + ", dateThrown=" + dateThrown + ", error_name="
				+ errorName + "]";
	}

}
