package it.kirey.kfuture.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.kirey.kfuture.dao.ILoggerDao;
import it.kirey.kfuture.entity.ErrorLog;
import it.kirey.kfuture.entity.ErrorTrace;
import it.kirey.kfuture.entity.User;
import it.kirey.kfuture.util.AppConstants;
import it.kirey.kfuture.util.Utilities;


/**
 *Class used for logging exceptions in the database.
 *It is a part of DAO layer
 *
 */

@Repository(value=ILoggerDao.SPRING_QUALIFIER)
@Transactional
public class LoggerDaoImpl implements ILoggerDao {


	@Autowired
	private SessionFactory sessionFactory;
	
	/**
	 * Setting data for ErrorLog and ErrorTrace and saving to database
	 */
	@Override
	public void log(Throwable ex, String invokingUrl) {
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object details = securityContext.getAuthentication().getPrincipal();
		User user = null;
		if (details instanceof User) {
			user = (User) details;
		}
		ErrorLog e = new ErrorLog();
		e.setErrorName(ex.toString());
		e.setMessage(Utilities.getErrorMessage(ex));
		if (user != null) {
			e.setUsername(user.getUsername());
		}else e.setUsername(AppConstants.USER_NOT_LOGGED);
		e.setInvokingUrl(invokingUrl);
		
		ErrorTrace errorTrace = new ErrorTrace();
		errorTrace.setTrace(Utilities.getErrorStackTrace(ex));
		errorTrace.setError(e);
	
		e.setDateThrown(new java.util.Date());

		sessionFactory.getCurrentSession().save(e);
		sessionFactory.getCurrentSession().save(errorTrace);
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ErrorLog> getAllLogs() {
		return sessionFactory.getCurrentSession().createCriteria(ErrorLog.class).list();
	}

	@Override
	public ErrorLog getLogWithException(Exception ex) {
		return (ErrorLog) sessionFactory.getCurrentSession().createCriteria(ErrorLog.class).add(Restrictions.eq("message", ex.getMessage()));
		
	}

	@Override
	public List<ErrorTrace> getAllTraces() {
		return sessionFactory.getCurrentSession().createCriteria(ErrorTrace.class).list();
	}

	@Override
	public ErrorTrace getTraceForErrorLog(int id) {
		
		ErrorLog error = (ErrorLog) sessionFactory.getCurrentSession().createCriteria(ErrorLog.class).add(Restrictions.eq("id", id)).uniqueResult();
		return (ErrorTrace) sessionFactory.getCurrentSession().createCriteria(ErrorTrace.class).add(Restrictions.eq("error", error)).uniqueResult();
	}

}
