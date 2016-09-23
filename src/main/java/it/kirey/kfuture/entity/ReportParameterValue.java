package it.kirey.kfuture.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="report_parameter_values")
public class ReportParameterValue {
	@Id
	@SequenceGenerator(name = "reportparamvalues_gen", sequenceName = "reportparamvalues_seq1", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reportparamvalues_gen")
	@Column(name = "id")
	private Integer id;
	
	@Column(name="value")
	private String value;
	
	@OneToOne
	@JoinColumn(name = "report_param_id", referencedColumnName = "id")
	private ReportParameter reportParams;
	
	@OneToOne
	@JoinColumn(name = "report_booking_id", referencedColumnName = "id")
	private ReportBooking reportBooking;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public ReportParameter getReportParams() {
		return reportParams;
	}
	
	public void setReportParams(ReportParameter reportParams) {
		this.reportParams = reportParams;
	}
	
	public ReportBooking getReportBooking() {
		return reportBooking;
	}
	
	public void setReportBooking(ReportBooking reportBooking) {
		this.reportBooking = reportBooking;
	}
}