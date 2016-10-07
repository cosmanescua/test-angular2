package it.kirey.kfuture.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IAmReportBlobsHome;
import it.kirey.kfuture.dao.IAmReportBookingParametersHome;
import it.kirey.kfuture.dao.IAmReportBookingsHome;
import it.kirey.kfuture.dao.IAmReportParametersHome;
import it.kirey.kfuture.dao.IAmReportsHome;
import it.kirey.kfuture.entity.AmReportBlobs;
import it.kirey.kfuture.entity.AmReportBookingParameters;
import it.kirey.kfuture.entity.AmReportBookings;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmReports;
import it.kirey.kfuture.jasper.ReportEngine;
import it.kirey.kfuture.service.IOrderServiceForEmail;
import it.kirey.kfuture.service.IReportService;
import it.kirey.kfuture.util.Utilities;
import net.sf.jasperreports.engine.JasperPrint;

@Service(value=IReportService.SERVICE_QUALIFIER)
public class ReportServiceImpl implements IReportService{
	
	@Autowired
	private IAmReportsHome amReportsHome;
	@Autowired
	private ReportEngine engine;
	@Autowired
	private IOrderServiceForEmail orderService;
	@Autowired
	private IAmReportParametersHome amReportParametersHome;
	@Autowired
	private IAmReportBookingParametersHome amReportBookingParametersHome;
	@Autowired
	private IAmReportBookingsHome amReportBookingsHome;
	@Autowired
	private IAmReportBlobsHome amReportBlobsHome;
	
	@Override
	@Transactional
	public void saveOrUpdateReportParamValue(AmReportBookingParameters reportParamValue) {
		this.amReportBookingParametersHome.attachDirty(reportParamValue);
	}
	
	@Override
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
	
	@Override
	@Transactional(readOnly=true)
	public AmReportParameters getReportParamsById(Integer id) {
		return this.amReportParametersHome.findById(id);
	}
	
	@Override
	@Transactional(readOnly=true)
	public AmReports getById(Integer id) {
		return this.amReportsHome.findById(id);
	}

	/*@Override
	@Transactional
	public ByteArrayOutputStream generateReport1(String jasperName) {
		try {

			Customer customer = orderService.getCustomerDetails();

			HashMap<String, Object> reportParam = new HashMap<String, Object>();
			reportParam.put("name", customer.getName());

			List<Customer> list = new ArrayList<Customer>();
			list.add(customer);
			list.add(customer);

			JasperPrint jp = engine.generateReport(reportParam, jasperName,
					new JRBeanCollectionDataSource(list, false));
			return engine.exportPdf(jp);

		} catch (Exception e) {
			return null;
		}
	}*/

	@Override
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
	
	@Override
	@Transactional(readOnly=true)
	public Map <String,Object> generateReportFromDB(Integer reportId,String format, HashMap<String, Object> reportParam, AmReports amReports) {

		//AmReportBlobs reportBlob = amReportBlobsHome.getBlobFileByReportId(reportId);
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
	
	@Override
	@Transactional(readOnly=true)
	public List<AmReports> getAllReportsWithoutBlobFile() {
		List<AmReports> repList =  amReportsHome.getAll();
		return repList;
	}
	
	@Override
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
