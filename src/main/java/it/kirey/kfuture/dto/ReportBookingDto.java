package it.kirey.kfuture.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ReportBookingDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public Integer id;
	public Date deadline;
	public String deadlineString;
	public String format;
	public UserDto user;
	public ReportDto report;
	public List<ReportParameterValueDto> reportParameterValues;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDeadline() {
		return deadline;
	}
	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}
	public String getFormat() {
		return format;
	}
	public void setFormat(String format) {
		this.format = format;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public ReportDto getReport() {
		return report;
	}
	public void setReport(ReportDto report) {
		this.report = report;
	}
	public List<ReportParameterValueDto> getReportParameterValues() {
		return reportParameterValues;
	}
	public void setReportParameterValues(List<ReportParameterValueDto> reportParameterValues) {
		this.reportParameterValues = reportParameterValues;
	}
	public String getDeadlineString() {
		return deadlineString;
	}
	public void setDeadlineString(String deadlineString) {
		this.deadlineString = deadlineString;
	}
	@Override
	public String toString() {
		return "ReportBookingDto [id=" + id + ", deadline=" + deadline + ", format=" + format + ", user=" + user
				+ ", report=" + report + "]";
	}
}
