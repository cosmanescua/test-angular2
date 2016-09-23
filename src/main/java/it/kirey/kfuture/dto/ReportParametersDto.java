package it.kirey.kfuture.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ReportParametersDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String paramName;
	private String paramValue;
	private boolean mandatory;
	private double minValue;
	private double maxValue;
	private String position;
	private String type;
	private String linkedPosition;
	private String linkedDirection;
	@JsonIgnore
	private ReportDto report;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	public String getParamValue() {
		return paramValue;
	}
	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}
	public boolean isMandatory() {
		return mandatory;
	}
	public void setMandatory(boolean mandatory) {
		this.mandatory = mandatory;
	}
	public double getMinValue() {
		return minValue;
	}
	public void setMinValue(double minValue) {
		this.minValue = minValue;
	}
	public double getMaxValue() {
		return maxValue;
	}
	public void setMaxValue(double maxValue) {
		this.maxValue = maxValue;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLinkedPosition() {
		return linkedPosition;
	}
	public void setLinkedPosition(String linkedPosition) {
		this.linkedPosition = linkedPosition;
	}
	public String getLinkedDirection() {
		return linkedDirection;
	}
	public void setLinkedDirection(String linkedDirection) {
		this.linkedDirection = linkedDirection;
	}
	public ReportDto getReport() {
		return report;
	}
	public void setReport(ReportDto report) {
		this.report = report;
	}
	@Override
	public String toString() {
		return "ReportParametersDto [id=" + id + ", paramName=" + paramName + ", paramValue=" + paramValue
				+ ", mandatory=" + mandatory + ", minValue=" + minValue + ", maxValue=" + maxValue + ", position="
				+ position + ", type=" + type + ", linkedPosition=" + linkedPosition + ", linkedDirection="
				+ linkedDirection + ", report=" + report + "]";
	}
}
