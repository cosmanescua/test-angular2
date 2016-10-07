package it.kirey.kfuture.util;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibm.icu.text.SimpleDateFormat;

import it.kirey.kfuture.dto.FilterDto;
import it.kirey.kfuture.dto.PaginationDto;
import it.kirey.kfuture.entity.AmReportParameters;
import it.kirey.kfuture.entity.AmUserAccounts;

public class Utilities {

	public static String getErrorMessage(Throwable ex) {
		StackTraceElement[] trace = ex.getStackTrace();
		return trace[0].toString();
	}

	public static String getErrorStackTrace(Throwable ex) {
		StringWriter sw = new StringWriter();
		ex.printStackTrace(new PrintWriter(sw));
		return sw.toString();
	}

	public static String getUrlFromRequest(HttpServletRequest req) {
		if (req.getQueryString() != null)
			return req.getRequestURL().toString() + "?" + req.getQueryString();
		else
			return req.getRequestURL().toString();
	}

	
	public static HashMap<String, Object> convertReportPrint(Map<String, String> dataMap, String objectKey, List<AmReportParameters> reportParameters) throws IOException, ParseException{
		
		HashMap<String, String> formParam = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<HashMap<String, String>> typeRef = new TypeReference<HashMap<String, String>>() {
		};
		formParam = mapper.readValue(dataMap.get(objectKey), typeRef);
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		for (AmReportParameters param : reportParameters) {
			switch (param.getType()) {
			case "String":
				result.put(param.getName(), formParam.get(String.valueOf(param.getId())));
				break;
			case "Integer":
				result.put(param.getName(), Integer.parseInt(formParam.get(param.getId())));
				break;

			case "Double":
				result.put(param.getName(), Double.parseDouble(formParam.get(param.getId())));
				break;

			case "Timestamp":
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
				Date parsedDate = dateFormat.parse(formParam.get(param.getId()));
				Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

				result.put(param.getName(), timestamp);
				break;

			default:
				break;
			}
		}

		return result;

	}
	
	/**
	 * Converts a string representation of date into Date object. Format param is format of that string representation.
	 * @param dateString
	 * @param format
	 * @return Date
	 */
	public static Date convertToDate(String dateString, String format) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace(System.out);
		}
		return parsedDate;
	}
	
	/**
	 * Converts a string representation of date into Date object. Default format is used.
	 * @param dateString
	 * @return Date
	 */
	public static Date convertToDate(String dateString) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace(System.out);
		}
		return parsedDate;
	}
	
	/**
	 * Validates a string representation of date. Format represents a format of that string representation.
	 * @param dateString
	 * @param format
	 * @return Boolean
	 */
	@SuppressWarnings("unused")
	public static Boolean isDateValid(String dateString, String format) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace(System.out);
			return Boolean.FALSE;
		}
		return Boolean.TRUE;
	}
	
	/**
	 * Validates a string representation of date.
	 * @param dateString
	 * @return Boolean
	 */
	@SuppressWarnings("unused")
	public static Boolean isDateValid(String dateString) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace(System.out);
			return Boolean.FALSE;
		}
		return Boolean.TRUE;
	}
	
	public static String geneneratePaginationQuery(PaginationDto paginationDto){
		
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		
		if (paginationDto.getFilterList().size() != 0) {
			Iterator<FilterDto> filterList = paginationDto.getFilterList().iterator();
			hqlSB.append("where ");
			while (filterList.hasNext()) {
				FilterDto filter = filterList.next();
				//if String
				if (filter.getQuery() instanceof String) {
					hqlSB.append("lower(");
					hqlSB.append(filter.getField());
					hqlSB.append(") like '%");
					hqlSB.append(filter.getQuery().toString().toLowerCase());
					hqlSB.append("%' ");
				//if Date
				} else if (filter.getQuery() instanceof Long) {
					hqlSB.append(filter.getField());
					hqlSB.append(" = to_date('");
					hqlSB.append(new Date((Long) filter.getQuery()));
					hqlSB.append("','YYYY-MM-DD') ");
				//Number
				} else {
					hqlSB.append(filter.getField());
					hqlSB.append(" = ");
					hqlSB.append(filter.getQuery());
					hqlSB.append(" ");
				}
				if (filterList.hasNext()) {
					hqlSB.append(" and ");
				}
			}
		}
		return hqlSB.toString();
	}
	
	public static String generateOrderByQuery(PaginationDto paginationDto){
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		
		if (paginationDto.getSort().getField() != null) {
			hqlSB.append("order by ");
			hqlSB.append(paginationDto.getSort().getField());
			hqlSB.append(" ");
			hqlSB.append(paginationDto.getSort().getType());
		}
		return hqlSB.toString();
	}
	
	public static AmUserAccounts getUserFromContext(){
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object details = securityContext.getAuthentication().getPrincipal();
		AmUserAccounts user = null;
		if (details instanceof AmUserAccounts) {
			user = (AmUserAccounts) details;
		}
		
		return user;
	}
	
}
