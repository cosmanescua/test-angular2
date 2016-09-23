package it.kirey.kfuture.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "report_bookings")
public class ReportBooking implements Serializable {

	private static final long serialVersionUID = 6125674811118102626L;

	@Id
	@SequenceGenerator(name = "reportbooking_gen", sequenceName = "reportbooking_seq1", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reportbooking_gen")
	@Column(name = "id")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@Column(name = "deadline")
	private Date deadline;

	@Column(name = "format")
	private String format;

	@ManyToOne
	@JoinColumn(name = "report_id", referencedColumnName = "id")
	private Report report;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUser() {
		return user.getId();
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public void setReport(Report report) {
		this.report = report;
	}

	public Report getReport() {
		return report;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
	
	@Override
	public String toString() {
		return "ReportBooking [id=" + id + ", user=" + user + ", deadline=" + deadline + ", format=" + format
				+ ", report=" + report + "]";
	}
}
