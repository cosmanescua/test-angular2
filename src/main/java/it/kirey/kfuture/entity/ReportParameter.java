package it.kirey.kfuture.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
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
@Table(name = "report_parameters")
public class ReportParameter implements Serializable {

	private static final long serialVersionUID = -9069783303489011837L;

	@Id
	@SequenceGenerator(name = "reportparam_gen", sequenceName = "reportparam_seq12", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reportparam_gen")
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String paramName;

	@Column(name = "value")
	private String paramValue;

	@Column(name = "mandatory")
	private boolean mandatory;

	@Column(name = "min_value")
	private double minValue;

	@Column(name = "max_value")
	private double maxValue;

	@Column(name = "position")
	private String position;

	@Column(name = "type")
	private String type;

	@Column(name = "linked_position")
	private String linkedPosition;

	@Column(name = "linked_direction")
	private String linkedDirection;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "report_id", referencedColumnName = "id")
	private Report report;

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

	// no need for getter - causes infinite loop
	public Report getReport() { return report; }
	 

	public void setReport(Report report) { this.report = report; }
	 

}
