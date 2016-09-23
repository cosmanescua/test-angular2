package it.kirey.kfuture.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "reports")
public class Report implements Serializable {

	private static final long serialVersionUID = 2073496469394572275L;

	@Id
	@SequenceGenerator(name = "report_gen1", sequenceName = "report_seq12", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_gen1")
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String reportName;

	
	@Column(name = "description")
	private String reportDescription;

	@Column(name = "avg_exec_time")
	private double avgExecutionTime;

	@Column(name = "num_execution")
	private int numExecution;
	
	
	@Column(name = "type")
	private String type;
	
	@JsonIgnore
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy = "report")
	@Cascade( value = { CascadeType.ALL })
	private List<ReportParameter> parameters;

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

	public double getAvgExecutionTime() {
		return avgExecutionTime;
	}

	public void setAvgExecutionTime(double avgExecutionTime) {
		this.avgExecutionTime = avgExecutionTime;
	}

	public int getNumExecution() {
		return numExecution;
	}

	public void setNumExecution(int numExecution) {
		this.numExecution = numExecution;
	}

	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<ReportParameter> getParameters() {
		return parameters;
	}

	public void setParameters(List<ReportParameter> parameters) {
		this.parameters = parameters;
	}

	
	@Override
	public String toString() {
		return "Report [id=" + id + ", reportName=" + reportName + ", reportDescription=" + reportDescription
				+ ", avgExecutionTime=" + avgExecutionTime + ", numExecution=" + numExecution + ", type=" + type
				+ "]";
	}

}
