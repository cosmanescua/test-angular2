package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.Report;
import it.kirey.kfuture.entity.ReportBlob;
import it.kirey.kfuture.entity.ReportBooking;


public interface IReportDao {
	public static final String SPRING_QUALIFIER = "reportDao";
	public List<Report> getAllReports();
	public Report findReportById(Integer reportId);
	public ReportBlob findBlobFileByReport(Integer reportId);
	List<ReportBooking> getAllReportsBooking();
	public void saveReportBlob(ReportBlob file);
	public void saveReport(Report report);
}
