package it.kirey.kfuture.entity;
// Generated Sep 22, 2016 3:50:04 PM by Hibernate Tools 4.3.5.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * AmErrorTraces generated by hbm2java
 */
@Entity
@Table(name = "AM_ERROR_TRACES")
public class AmErrorTraces implements java.io.Serializable {
	private static final long serialVersionUID = 1L;

	private Integer amErrorLog;

	@JsonBackReference
	private AmErrorLogs amErrorLogs;

	private String trace;

	public AmErrorTraces() {
	}

	public AmErrorTraces(AmErrorLogs amErrorLogs, String trace) {
		this.amErrorLogs = amErrorLogs;
		this.trace = trace;
	}

	@Id
	@GenericGenerator(name = "generator", strategy = "foreign", parameters = @Parameter(name = "property", value = "amErrorLogs"))
	@GeneratedValue(generator = "generator")
	@Column(name = "AM_ERROR_LOG", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getAmErrorLog() {
		return this.amErrorLog;
	}

	public void setAmErrorLog(Integer amErrorLog) {
		this.amErrorLog = amErrorLog;
	}

	@OneToOne
	@PrimaryKeyJoinColumn
	public AmErrorLogs getAmErrorLogs() {
		return this.amErrorLogs;
	}

	public void setAmErrorLogs(AmErrorLogs amErrorLogs) {
		this.amErrorLogs = amErrorLogs;
	}

	@Lob
	@Column(name = "TRACE", nullable = false)
	public String getTrace() {
		return this.trace;
	}

	public void setTrace(String trace) {
		this.trace = trace;
	}
}
