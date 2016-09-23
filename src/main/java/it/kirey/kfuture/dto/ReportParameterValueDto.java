package it.kirey.kfuture.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ReportParameterValueDto {
	public Integer id;
	public String paramValue;
	public ReportParametersDto reportParams;
	@JsonIgnore
	public ReportBookingDto reportBooking;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getParamValue() {
		return paramValue;
	}
	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}
	public ReportParametersDto getReportParams() {
		return reportParams;
	}
	public void setReportParams(ReportParametersDto reportParams) {
		this.reportParams = reportParams;
	}
	public ReportBookingDto getReportBooking() {
		return reportBooking;
	}
	public void setReportBooking(ReportBookingDto reportBooking) {
		this.reportBooking = reportBooking;
	}
	@Override
	public String toString() {
		return "ReportParameterValueDto [id=" + id + ", paramValue=" + paramValue + ", reportParam=" + reportParams
				+ ", reportBooking=" + reportBooking + "]";
	}
}
