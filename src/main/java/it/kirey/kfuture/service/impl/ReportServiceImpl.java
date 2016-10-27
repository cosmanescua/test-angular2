package it.kirey.kfuture.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.impl.AmReportBookingsHome;
import it.kirey.kfuture.dao.impl.AmReportsHome;
import it.kirey.kfuture.entity.AmReportBookings;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmReports;
import it.kirey.kfuture.jasper.ReportEngine;
import it.kirey.kfuture.service.IReportService;
import it.kirey.kfuture.util.Utilities;
import net.sf.jasperreports.engine.JasperPrint;

@Service(value=IReportService.SERVICE_QUALIFIER)
public class ReportServiceImpl implements IReportService{

	@Autowired
	private AmReportsHome amReportsHome;
	@Autowired
	private ReportEngine engine;
	@Autowired
	private AmReportBookingsHome amReportBookingsHome;

	
	@Transactional
	public void saveOrUpdateReportBooking(AmReportBookings reportBooking) {
		Date today = new Date();
		reportBooking.setStatus("FOR_CREATION");
		reportBooking.setAmUserAccountsByUtInsert(Utilities.getUserFromContext());
		reportBooking.setAmUserAccountsByUtUpdate(Utilities.getUserFromContext());
		reportBooking.setTsUpdate(today);
		reportBooking.setTsInsert(today);
		this.amReportBookingsHome.attachDirty(reportBooking);
	}
	
	public ByteArrayOutputStream generateReport2(String name, String jasperName) {
		try {
			Map<String, Object> reportParams = new HashMap<String, Object>();
			reportParams.put("name", name);
			JasperPrint jp = engine.generateReport(reportParams, jasperName);
			return engine.exportPdf(jp);
		} catch (Exception e) {
			return null;
		}
	}
	
	@Transactional(readOnly=true)
	public Map <String,Object> generateReportFromDB(String format, HashMap<String, Object> reportParam, AmReports amReports) {
		Map <String,Object> results = null;
		
		if (amReports.getAmReportBlobs().getFileBlob() != null) {
			 results = new HashMap<String, Object>();

			JasperPrint jp = engine.generateReportFromDBFromJasperFile(reportParam, amReports.getAmReportBlobs().getFileBlob());
			
			results.put("reportName", amReports.getName());
			if("pdf".equals(format))
				results.put("report",  engine.exportPdf(jp));
			else
				results.put("report",  engine.exportXls(jp));
			return results;
		}
		return results;

	}
	
	@Transactional
	public void saveReport(AmReports report) throws IOException {
		
		report.setAmUserAccountsByUtInsert(Utilities.getUserFromContext());
		report.setAmUserAccountsByUtUpdate(Utilities.getUserFromContext());
		report.setTsInsert(new Date());
		report.setTsUpdate(new Date());
		
		if(report.getAmReportParameterses().size() != 0){		
			for (AmReportParameters reportParameter : report.getAmReportParameterses()) {
				reportParameter.setAmUserAccountsByUtInsert(Utilities.getUserFromContext());
				reportParameter.setAmUserAccountsByUtUpdate(Utilities.getUserFromContext());
				reportParameter.setTsInsert(new Date());
				reportParameter.setTsUpdate(new Date());
			}
		}
		amReportsHome.attachDirty(report);
	}

}
