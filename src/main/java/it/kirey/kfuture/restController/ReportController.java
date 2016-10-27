package it.kirey.kfuture.restController;

import java.io.ByteArrayOutputStream;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import it.kirey.kfuture.dao.impl.AmReportsHome;
import it.kirey.kfuture.entity.AmReportBookings;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmReports;
import it.kirey.kfuture.service.IReportService;
import it.kirey.kfuture.util.Utilities;

@RestController
@RequestMapping("/rest")
public class ReportController {
	
	@Autowired
	private IReportService reportService;
	@Autowired
	private AmReportsHome amReportsHome;

	/**
	 * Get list of all reports without fileBlob attribute
	 * 
	 * @return
	 */
	@RequestMapping(value = "/reports", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<AmReports>> getReports() throws Exception {

		List<AmReports> reportList = amReportsHome.findAll();
		return new ResponseEntity<List<AmReports>>(reportList, HttpStatus.OK);
	}

	/**
	 * Create new report
	 * @param report
	 * @param result - validation
	 * @return
	 */
	@RequestMapping(value = "/reports", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> saveReport(@RequestBody @Valid AmReports report, BindingResult result)
			throws Exception {

		if (result.hasErrors()) {
			return new ResponseEntity<Object>(result.getFieldError().toString(), HttpStatus.CONFLICT);
		} else {
			reportService.saveReport(report);
			return new ResponseEntity<Object>("ok", HttpStatus.OK);
		}

	}

	/**
	 * Generate report in XLSX or PDF
	 * 
	 * @param viewType - inline/attachment
	 * @param reportId
	 * @param format - pdf/xlsx
	 * @param dataMap - map of parameters
	 * @return
	 * @throws Exception
	 * @throws ParseException
	 */
	@RequestMapping(value = "/reports/{reportId}/{format}/{viewType}", method = RequestMethod.GET)
	public ResponseEntity<byte[]> generateReport(@PathVariable String viewType, @PathVariable Integer reportId,
			@PathVariable String format, @RequestParam(required = true) Map<String, String> dataMap) throws Exception {

		List<AmReportParameters> reportParametersList = this.amReportsHome.findById(reportId).getAmReportParameterses();
		HashMap<String, Object> reportParameters = Utilities.convertReportPrint(dataMap, "parameters", reportParametersList);

		ByteArrayOutputStream reportGenerated = new ByteArrayOutputStream();
		Map<String, Object> result = new HashMap<>();

		if (!reportParametersList.isEmpty()) {
			result = reportService.generateReportFromDB(format, reportParameters, reportParametersList.get(0).getAmReports());
		}
		if (result != null) {
			reportGenerated = (ByteArrayOutputStream) result.get("report");
			return ResponseEntity.ok()
					/* .contentLength((int) reportGenerated.size()) */
					.header("Content-Type", "application/octet-stream")
					.contentType("pdf".equals(format) ? MediaType.parseMediaType("application/pdf")
							: MediaType.parseMediaType("application/vnd.ms-excel"))
					.body(reportGenerated.toByteArray());

		} else {
			return new ResponseEntity<byte[]>(HttpStatus.NO_CONTENT);
		}
	}

	/**
	 * Save booking for report
	 * @param reportBooking
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/reports/book", method = RequestMethod.PUT)
	public ResponseEntity<String> addReportBooking(@RequestBody(required = true) AmReportBookings reportBooking)
			throws Exception {
		
		this.reportService.saveOrUpdateReportBooking(reportBooking);
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}

}
