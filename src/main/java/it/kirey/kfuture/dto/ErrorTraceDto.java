package it.kirey.kfuture.dto;

public class ErrorTraceDto {

	private String trace;
	private Integer id;
	
	public String getTrace() {
		return trace;
	}
	public void setTrace(String trace) {
		this.trace = trace;
	}
	public Integer getErrorLogId() {
		return id;
	}
	public void setErrorLogId(Integer errorLogId) {
		this.id = errorLogId;
	}
	
	@Override
	public String toString() {
		return "ErrorTraceDto [trace=" + trace + ", id=" + id + "]";
	}
}
