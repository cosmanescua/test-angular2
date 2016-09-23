package it.kirey.kfuture.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

@Entity
@Table(name = "report_blobs")
public class ReportBlob implements Serializable {

	private static final long serialVersionUID = 572892618798899931L;

	private Report report;
	private byte[] fileBlob;
	
	@Id
	@GeneratedValue(generator="rep_blob_gen")
	@GenericGenerator(name="rep_blob_gen", strategy="foreign", parameters=@Parameter(value="report", name = "property"))
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "report_id")
	public Report getReport() {
		return report;
	}
	public void setReport(Report report) {
		this.report = report;
	}
	
	@Lob
	@Column(name = "file_blob")
	public byte[] getFileBlob() {
		return fileBlob;
	}
	public void setFileBlob(byte[] fileBlob) {
		this.fileBlob = fileBlob;
	}

}
