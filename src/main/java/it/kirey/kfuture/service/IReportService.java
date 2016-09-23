package it.kirey.kfuture.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import it.kirey.kfuture.dto.ReportBookingDto;
import it.kirey.kfuture.dto.ReportDto;
import it.kirey.kfuture.entity.Report;
import it.kirey.kfuture.entity.ReportParameterValue;
import it.kirey.kfuture.entity.ReportParameter;

public interface IReportService {
	public static final String SPRING_QUALIFIER = "reportService";
	
	ByteArrayOutputStream generateReport1(String jasperName);
	ByteArrayOutputStream generateReport2(String name, String jasperName);
	ByteArrayOutputStream generateReport3(String jasperName);
	List<ReportDto> getAllReports();
	Map <String,Object> generateReportFromDB(Integer reportId,String format, HashMap<String, Object> reportParam);
	public Report getById(Integer id);
	public ReportParameter getReportParamsById(Integer id);
	public void saveOrUpdateReportBooking(ReportBookingDto obj);
	public void saveOrUpdateReportParamValue(ReportParameterValue obj);
	void saveReport(ReportDto report) throws IOException;
}
