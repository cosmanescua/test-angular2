package it.kirey.kfuture.restController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
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

import it.kirey.kfuture.dto.ReportBookingDto;
import it.kirey.kfuture.dto.ReportDto;
import it.kirey.kfuture.entity.ReportParameter;
import it.kirey.kfuture.exception.ControllerException;
import it.kirey.kfuture.service.IReportService;
import it.kirey.kfuture.util.Utilities;


@RestController
@RequestMapping("/rest")
public class ReportController {
	@Autowired
	private IReportService reportService;
		
	/**
	 * Get list of all reports
	 * @return
	 */
	@RequestMapping(value = "/reports", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<ReportDto>> getReports(){
		
		List<ReportDto> reportList = reportService.getAllReports();
		
		return new ResponseEntity<List<ReportDto>>(reportList, HttpStatus.OK);
	}
	
	/**
	 * Create new report
	 * @param rep - DTO class
	 * @param result - validation
	 * @return
	 */
	@RequestMapping(value = "/reports", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> saveReport(@RequestBody @Valid ReportDto rep, BindingResult result){
		try {
			if(result.hasErrors()){
				return new ResponseEntity<Object>(result.getFieldError().toString(), HttpStatus.CONFLICT);
			}else{
				reportService.saveReport(rep);
				return new ResponseEntity<Object>("ok", HttpStatus.OK);
			}
			}catch (Exception e) {
				 throw new ControllerException("ErrorConstants-Constant", e, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	
	
	/**
	 * Generate report in XLSX or PDF
	 * @param viewType - inline/attachment
	 * @param reportId 
	 * @param format - pdf/xlsx
	 * @param dataMap - map of parameters
	 * @return
	 * @throws IOException
	 * @throws ParseException
	 */
	@RequestMapping(value = "/reports/{reportId}/{format}/{viewType}", method = RequestMethod.GET)
	public ResponseEntity<byte[]> generateReport(@PathVariable String viewType, @PathVariable Integer reportId,
												 @PathVariable String format, @RequestParam(required = true) Map<String, String> dataMap){
		try{
			List<ReportParameter> reportParametersList = this.reportService.getById(reportId).getParameters();
			HashMap<String, Object> reportParameters = Utilities.convertReportPrint(dataMap, "parameters", reportParametersList);
			
			//get report form DB
			ByteArrayOutputStream reportGenerated = new ByteArrayOutputStream();
			Map <String,Object> result = new HashMap<>();
			result = reportService.generateReportFromDB(reportId, format, reportParameters);
			
			if(result != null) {
				reportGenerated = (ByteArrayOutputStream) result.get("report");
				return ResponseEntity
			            .ok()
			            .contentLength((int) reportGenerated.size())
			            .header("Content-Type", "application/octet-stream")
			            .contentType("pdf".equals(format)?MediaType.parseMediaType("application/pdf"):MediaType.parseMediaType("application/vnd.ms-excel"))	            
			            .body(reportGenerated.toByteArray());
			  
			}else{
				return new ResponseEntity<byte[]>( HttpStatus.NO_CONTENT);        
			}
		}catch (Exception e){
			throw new ControllerException("ErrorConstants-Constant", e, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	
	/**
	 * Save booking for report
	 * @param reportBookingDTO
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/reports/book", method = RequestMethod.PUT)
	public ResponseEntity<String> addReportBooking(@RequestBody(required=true) ReportBookingDto reportBookingDTO) {
		
		try{
			String dateString = reportBookingDTO.getDeadlineString();
			Date parsedDate = null;
			
			if(!Utilities.isDateValid(dateString)) {
				return new ResponseEntity<String>("", HttpStatus.INTERNAL_SERVER_ERROR);
			} else {
				parsedDate = Utilities.convertToDate(dateString);
				reportBookingDTO.setDeadline(parsedDate);
			}
			
			this.reportService.saveOrUpdateReportBooking(reportBookingDTO);
			return new ResponseEntity<String>("ok", HttpStatus.OK);
		}catch (Exception e) {
			throw new ControllerException("ErrorConstants-Constant", e, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
