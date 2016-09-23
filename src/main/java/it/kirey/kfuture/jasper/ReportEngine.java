package it.kirey.kfuture.jasper;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate5.SessionFactoryUtils;
import org.springframework.stereotype.Component;

@Component
public class ReportEngine {

	private String reportDesignRootDir = "jasper/";
	@Resource
	private SessionFactory sessionFactory;

	/*
	 * to be used if we have want to make the query into jrxml based on report parameters and
	 * load the jrxml file from resources folder
	 * 
	 */
	public JasperPrint generateReport(Map<String, Object> reportParams, String reportName) {
		try {
			String sourcepath = reportDesignRootDir + reportName + ".jrxml";
			InputStream reportStream = this.getClass().getClassLoader().getResourceAsStream(sourcepath);
			JasperDesign jd = JRXmlLoader.load(reportStream);
			JasperReport jr = JasperCompileManager.compileReport(jd);
			return JasperFillManager.fillReport(jr, reportParams,
					SessionFactoryUtils.getDataSource(sessionFactory).getConnection());
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}

	/*
	 * to be used if we have want to send the data collection through JRBeanCollectionDataSource and 
	 * load the jrxml file from resources folder
	 * 
	 */
	public JasperPrint generateReport(Map<String, Object> reportParams, String reportName,
			JRBeanCollectionDataSource jrDataSource) {
		try {
			String sourcepath = reportDesignRootDir + reportName + ".jrxml";
			InputStream reportStream = this.getClass().getClassLoader().getResourceAsStream(sourcepath);
			JasperDesign jd = JRXmlLoader.load(reportStream);
			JasperReport jr = JasperCompileManager.compileReport(jd);
			return JasperFillManager.fillReport(jr, reportParams, jrDataSource);
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}
	
	/*
	 * to be used if we have want to make the query into jrxml based on report parameters and
	 * load the jrxml file from database
	 * 
	 */
	public JasperPrint generateReportFromDB(HashMap<String, Object> reportParams, byte[] file) {
		try {

			InputStream reportStream = new ByteArrayInputStream(file);
			JasperDesign jd = JRXmlLoader.load(reportStream);
			JasperReport jr = JasperCompileManager.compileReport(jd);
			return JasperFillManager.fillReport(jr, reportParams,
					SessionFactoryUtils.getDataSource(sessionFactory).getConnection());
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}
	
	/*
	 * to be used if we have want to send the data collection through JRBeanCollectionDataSource and 
	 * load the jrxml file from database
	 * 
	 */
	public JasperPrint generateReportFromDB(HashMap<String, Object> reportParams, byte[] file,
			JRBeanCollectionDataSource jrDataSource) {
		try {

			InputStream reportStream = new ByteArrayInputStream(file);
			JasperDesign jd = JRXmlLoader.load(reportStream);
			JasperReport jr = JasperCompileManager.compileReport(jd);
			return JasperFillManager.fillReport(jr, reportParams, jrDataSource);
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}
	
	
	/**
	 * load jasper file
	 * @param reportParams - parameters for creating query
	 * @param file - .jasper file
	 * @return
	 */
	public JasperPrint generateReportFromDBFromJasperFile(HashMap<String, Object> reportParams, byte[] file) {
		try {
			InputStream reportStream = new ByteArrayInputStream(file);
			JasperReport jr = (JasperReport) JRLoader.loadObject(reportStream);
			return JasperFillManager.fillReport(jr, reportParams,
					SessionFactoryUtils.getDataSource(sessionFactory).getConnection());
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}

	public ByteArrayOutputStream exportPdf(JasperPrint jp) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			JRPdfExporter exporter = new JRPdfExporter();

			exporter.setExporterInput(new SimpleExporterInput(jp));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(baos));
			// SimplePdfExporterConfiguration configuration = new
			// SimplePdfExporterConfiguration();
			// configuration.setPermissions(PdfWriter.AllowCopy |
			// PdfWriter.AllowPrinting);
			// exporter.setConfiguration(configuration);
			exporter.exportReport();
			return baos;
		} catch (JRException e) {
			System.out.println(e.getMessage());
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return null;
	}

	public ByteArrayOutputStream exportXls(JasperPrint jp) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			JRXlsxExporter exporter = new JRXlsxExporter();

			exporter.setExporterInput(new SimpleExporterInput(jp));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(baos));

			exporter.exportReport();
			return baos;
		} catch (JRException e) {
			System.out.println("error");
		} catch (Exception e) {
			System.out.println("error");
		}
		return null;
	}
	// to be used for concatenating JasperPrint
	// public JasperPrint concatPdf(JasperPrint jp1, JasperPrint jp2) {
	// List pages = jp2.getPages();
	// for (int j = 0; j < pages.size(); j++) {
	// JRPrintPage object = (JRPrintPage) pages.get(j);
	// jp1.addPage(object);
	// }
	// return jp1;
	// }

}
