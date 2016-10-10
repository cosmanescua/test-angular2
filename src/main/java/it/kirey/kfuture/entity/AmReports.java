package it.kirey.kfuture.entity;
// Generated 03-Oct-2016 09:46:32 by Hibernate Tools 5.1.0.Beta1

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * AmReports generated by hbm2java
 */
@Entity
@Table(name = "AM_REPORTS", uniqueConstraints = @UniqueConstraint(columnNames = "NAME"))
public class AmReports implements java.io.Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	
	@JsonIgnore
	private AmUserAccounts amUserAccountsByUtUpdate;
	
	@JsonIgnore
	private AmUserAccounts amUserAccountsByUtInsert;
	
	private String name;
	private String description;
	private String type;
	private Long avgExecTime;
	private Long numExecution;
	private Date tsInsert;
	private Date tsUpdate;
	
	@JsonManagedReference(value = "blob_file")
	private AmReportBlobs amReportBlobs;
	
	@JsonIgnore
	/*@JsonBackReference(value = "report_bookingses")*/
	private List<AmReportBookings> amReportBookingses;
	
	@JsonManagedReference(value = "report_parameters")
	private List<AmReportParameters> amReportParameterses;

	public AmReports() {
	}

	public AmReports(Integer id, AmUserAccounts amUserAccountsByUtUpdate, AmUserAccounts amUserAccountsByUtInsert,
			String name, String type, Date tsInsert, Date tsUpdate) {
		this.id = id;
		this.amUserAccountsByUtUpdate = amUserAccountsByUtUpdate;
		this.amUserAccountsByUtInsert = amUserAccountsByUtInsert;
		this.name = name;
		this.type = type;
		this.tsInsert = tsInsert;
		this.tsUpdate = tsUpdate;
	}

	public AmReports(Integer id, AmUserAccounts amUserAccountsByUtUpdate, AmUserAccounts amUserAccountsByUtInsert,
			String name, String description, String type, Long avgExecTime, Long numExecution, Date tsInsert,
			Date tsUpdate, AmReportBlobs amReportBlobs, List<AmReportBookings> amReportBookingses,
			List<AmReportParameters> amReportParameterses) {
		this.id = id;
		this.amUserAccountsByUtUpdate = amUserAccountsByUtUpdate;
		this.amUserAccountsByUtInsert = amUserAccountsByUtInsert;
		this.name = name;
		this.description = description;
		this.type = type;
		this.avgExecTime = avgExecTime;
		this.numExecution = numExecution;
		this.tsInsert = tsInsert;
		this.tsUpdate = tsUpdate;
		this.amReportBlobs = amReportBlobs;
		this.amReportBookingses = amReportBookingses;
		this.amReportParameterses = amReportParameterses;
	}

	@Id
	@SequenceGenerator(name = "report_gen", sequenceName = "SEQ_AM_REPORTS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "UT_UPDATE", nullable = false)
	public AmUserAccounts getAmUserAccountsByUtUpdate() {
		return this.amUserAccountsByUtUpdate;
	}

	public void setAmUserAccountsByUtUpdate(AmUserAccounts amUserAccountsByUtUpdate) {
		this.amUserAccountsByUtUpdate = amUserAccountsByUtUpdate;
	}

	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "UT_INSERT", nullable = false)
	public AmUserAccounts getAmUserAccountsByUtInsert() {
		return this.amUserAccountsByUtInsert;
	}

	public void setAmUserAccountsByUtInsert(AmUserAccounts amUserAccountsByUtInsert) {
		this.amUserAccountsByUtInsert = amUserAccountsByUtInsert;
	}

	@Column(name = "NAME", unique = true, nullable = false, length = 100)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "DESCRIPTION")
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "TYPE", nullable = false, length = 20)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "AVG_EXEC_TIME", precision = 22, scale = 0)
	public Long getAvgExecTime() {
		return this.avgExecTime;
	}

	public void setAvgExecTime(Long avgExecTime) {
		this.avgExecTime = avgExecTime;
	}

	@Column(name = "NUM_EXECUTION", precision = 10, scale = 0)
	public Long getNumExecution() {
		return this.numExecution;
	}

	public void setNumExecution(Long numExecution) {
		this.numExecution = numExecution;
	}

	@Column(name = "TS_INSERT", nullable = false)
	public Date getTsInsert() {
		return this.tsInsert;
	}

	public void setTsInsert(Date tsInsert) {
		this.tsInsert = tsInsert;
	}

	@Column(name = "TS_UPDATE", nullable = false)
	public Date getTsUpdate() {
		return this.tsUpdate;
	}

	public void setTsUpdate(Date tsUpdate) {
		this.tsUpdate = tsUpdate;
	}

	@OneToOne(mappedBy = "amReports")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
	public AmReportBlobs getAmReportBlobs() {
		return this.amReportBlobs;
	}

	public void setAmReportBlobs(AmReportBlobs amReportBlobs) {
		this.amReportBlobs = amReportBlobs;
	}

	@OneToMany(mappedBy = "amReports")
	@LazyCollection(LazyCollectionOption.FALSE)
	public List<AmReportBookings> getAmReportBookingses() {
		return this.amReportBookingses;
	}

	
	public void setAmReportBookingses(List<AmReportBookings> amReportBookingses) {
		this.amReportBookingses = amReportBookingses;
	}

	@OneToMany(mappedBy = "amReports")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
	public List<AmReportParameters> getAmReportParameterses() {
		return this.amReportParameterses;
	}

	public void setAmReportParameterses(List<AmReportParameters> amReportParameterses) {
		this.amReportParameterses = amReportParameterses;
	}

}