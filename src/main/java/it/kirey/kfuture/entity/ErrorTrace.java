package it.kirey.kfuture.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "error_traces")
public class ErrorTrace implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9052376832191273273L;

	@Id
	@GenericGenerator(name = "generator", strategy = "foreign",
			parameters = @Parameter(name = "property", value = "error"))
	@GeneratedValue(generator = "generator")
	@JoinColumn(name = "error_id", unique = true, nullable = false)
	@OneToOne(cascade = CascadeType.ALL)
	private ErrorLog error;

	@Lob
	@Column(name = "trace", nullable = false)
	private String trace;

	public String getTrace() {
		return trace;
	}

	public void setTrace(String trace) {
		this.trace = trace;
	}

	public void setError(ErrorLog error) {
		this.error = error;
	}

	@JsonProperty("errorLog")
	public ErrorLog getError() {
		return this.error;
	}

}
