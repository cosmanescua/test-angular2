package it.kirey.kfuture.dto;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

public class ReportDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String reportName;
	private String reportDescription;
	private String type;
	private List<ReportParametersDto> parameters;
	private byte[] file;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public String getReportDescription() {
		return reportDescription;
	}
	public void setReportDescription(String reportDescription) {
		this.reportDescription = reportDescription;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public List<ReportParametersDto> getParameters() {
		return parameters;
	}
	public void setParameters(List<ReportParametersDto> parameters) {
		this.parameters = parameters;
	}
	public byte[] getFile() {
		return file;
	}
	public void setFile(byte[] file) {
		this.file = file;
	}
	@Override
	public String toString() {
		return "ReportDto [id=" + id + ", reportName=" + reportName + ", reportDescription=" + reportDescription
				+ ", type=" + type + ", parameters=" + parameters + ", file=" + Arrays.toString(file) + "]";
	}
}
