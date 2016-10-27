package it.kirey.kfuture.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import it.kirey.kfuture.entity.AmReportBookings;
import it.kirey.kfuture.entity.AmReports;

public interface IReportService {
	public static final String SERVICE_QUALIFIER = "reportService";

	ByteArrayOutputStream generateReport2(String name, String jasperName);

	Map<String, Object> generateReportFromDB(String format, HashMap<String, Object> reportParam, AmReports amReports);

	public void saveOrUpdateReportBooking(AmReportBookings obj);

	void saveReport(AmReports report) throws IOException;
}
