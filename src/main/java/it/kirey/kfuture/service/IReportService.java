package it.kirey.kfuture.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import it.kirey.kfuture.entity.AmReportBookingParameters;
import it.kirey.kfuture.entity.AmReportBookings;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmReports;

public interface IReportService {
	public static final String SERVICE_QUALIFIER = "reportService";
	
	/*ByteArrayOutputStream generateReport1(String jasperName);*/
	ByteArrayOutputStream generateReport2(String name, String jasperName);
	/*ByteArrayOutputStream generateReport3(String jasperName);*/
	List<AmReports> getAllReportsWithoutBlobFile();
	Map <String,Object> generateReportFromDB(Integer reportId,String format, HashMap<String, Object> reportParam, AmReports amReports);
	public AmReports getById(Integer id);
	public AmReportParameters getReportParamsById(Integer id);
	public void saveOrUpdateReportBooking(AmReportBookings obj);
	public void saveOrUpdateReportParamValue(AmReportBookingParameters obj);
	void saveReport(AmReports report) throws IOException;
}
