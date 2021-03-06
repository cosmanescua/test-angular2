package it.kirey.kfuture.entity;// default package
// Generated 03-Oct-2016 17:51:26 by Hibernate Tools 5.2.0.Beta1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * TestFileManagement generated by hbm2java
 */
@Entity
@Table(name = "TEST_FILE_MANAGEMENT")
public class TestFileManagement implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private String filename;
	private String filepath;

	public TestFileManagement() {
	}

	public TestFileManagement(int id, String filename, String filepath) {
		this.id = id;
		this.filename = filename;
		this.filepath = filepath;
	}

	@Id
	@SequenceGenerator(name = "file_gen", sequenceName = "file_seq", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "file_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 22, scale = 0)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "FILENAME", nullable = false, length = 200)
	public String getFilename() {
		return this.filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	@Column(name = "FILEPATH", nullable = false, length = 200)
	public String getFilepath() {
		return this.filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

}
