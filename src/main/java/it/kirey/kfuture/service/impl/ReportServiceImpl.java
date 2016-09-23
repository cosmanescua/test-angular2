package it.kirey.kfuture.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.IReportDao;
import it.kirey.kfuture.dao.ReportBookingDao;
import it.kirey.kfuture.dao.ReportParamDao;
import it.kirey.kfuture.dao.ReportParamValueDao;
import it.kirey.kfuture.dto.ReportBookingDto;
import it.kirey.kfuture.dto.ReportDto;
import it.kirey.kfuture.entity.Customer;
import it.kirey.kfuture.entity.Report;
import it.kirey.kfuture.entity.ReportBlob;
import it.kirey.kfuture.entity.ReportBooking;
import it.kirey.kfuture.entity.ReportParameter;
import it.kirey.kfuture.entity.ReportParameterValue;
import it.kirey.kfuture.jasper.ReportEngine;
import it.kirey.kfuture.service.IReportService;
import it.kirey.kfuture.service.OrderServiceForEmail;
import it.kirey.kfuture.util.ObjectTransformer;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service(value=IReportService.SPRING_QUALIFIER)
public class ReportServiceImpl implements IReportService{
	
	@Autowired
	private IReportDao reportDao;
	@Autowired
	private ReportEngine engine;
	@Autowired
	private OrderServiceForEmail orderService;
	@Autowired
	private ReportParamDao reportParamDao;
	@Autowired
	private ReportParamValueDao reportParamValueDao;
	@Autowired
	private ReportBookingDao reportBookingDao;
	@Autowired
	private ObjectTransformer objectTransformer;
	
	@Override
	@Transactional
	public void saveOrUpdateReportParamValue(ReportParameterValue reportParamValue) {
		this.reportParamValueDao.saveOrUpdate(reportParamValue);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public void saveOrUpdateReportBooking(ReportBookingDto reportBookingDTO) {
		ReportBooking reportBooking = (ReportBooking)this.objectTransformer.build(reportBookingDTO, ReportBooking.class);
		List<ReportParameterValue> reportParameters = (List<ReportParameterValue>)this.objectTransformer.build(reportBookingDTO.getReportParameterValues(), ReportParameterValue.class);
		
		this.reportBookingDao.saveOrUpdate(reportBooking);
		
		for(ReportParameterValue reportParameterValue : reportParameters) {
			reportParameterValue.setReportBooking(reportBooking);
			this.reportParamValueDao.saveOrUpdate(reportParameterValue);
		}
	}
	
	@Override
	@Transactional(readOnly=true)
	public ReportParameter getReportParamsById(Integer id) {
		return this.reportParamDao.getById(id);
	}
	
	@Override
	@Transactional(readOnly=true)
	public Report getById(Integer id) {
		return this.reportDao.findReportById(id);
	}

	@Override
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
	}

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
	@Transactional
	public ByteArrayOutputStream generateReport3(String jasperName) {
		Customer customer = orderService.getCustomerDetails();

		HashMap<String, Object> reportParam = new HashMap<String, Object>();
		reportParam.put("name", customer.getName());

		List<Customer> list = new ArrayList<Customer>();
		list.add(customer);
		list.add(customer);

		JasperPrint jp = engine.generateReport(reportParam, jasperName, new JRBeanCollectionDataSource(list, false));
		return engine.exportXls(jp);
	}
	
	@Transactional
	@Override
	public Map <String,Object> generateReportFromDB(Integer reportId,String format, HashMap<String, Object> reportParam) {

		ReportBlob reportBlob = reportDao.findBlobFileByReport(reportId);
		Map <String,Object> results = null;
		
		if (reportBlob != null) {
			 results = new HashMap<String, Object>();

			JasperPrint jp = engine.generateReportFromDB(reportParam, reportBlob.getFileBlob());
			
			results.put("reportName", reportBlob.getReport().getReportName());
			if("pdf".equals(format))
				results.put("report",  engine.exportPdf(jp));
			else
				results.put("report",  engine.exportXls(jp));
			return results;
		}
		return results;

	}
	@Transactional
	@Override
	public List<ReportDto> getAllReports() {
		
		List<Report> repList =  reportDao.getAllReports();
		List<ReportDto> reportDTOs = objectTransformer.build(repList, ReportDto.class);
		return reportDTOs;
	}
	
	
	@Transactional
	@Override
	public void saveReport(ReportDto reportDto) throws IOException {
		
		
		Report report = (Report) objectTransformer.build(reportDto, Report.class);
		List<ReportParameter> listP = (List<ReportParameter>) objectTransformer.build(reportDto.getParameters(), ReportParameter.class);
		for (ReportParameter reportParameter : listP) {
			reportParameter.setReport(report);
		}
		report.setParameters(listP);
		
		ReportBlob blob = new ReportBlob();
		reportDao.saveReport(report);
		blob.setFileBlob(reportDto.getFile());
		blob.setReport(report);
		reportDao.saveReportBlob(blob);
	}
}
