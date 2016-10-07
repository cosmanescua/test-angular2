package it.kirey.kfuture.util;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component(value = "printer")
public class PrintingToConsole {

	@Autowired
	private TaskExecutor loggerTaskExecutor;
	
	/**
	 * Setter method initialized by Spring Framework.
	 */
	public void setLoggerTaskExecutor(TaskExecutor loggerTaskExecutor) {
		this.loggerTaskExecutor = loggerTaskExecutor;
	}
	
	public  void printMessage(Class<?> targetClass, String message) {
		printMessage(targetClass, message, null);
	}
	
	public  void printMessage(Class<?> targetClass, String message, Throwable ex) {
		Log logger = LogFactory.getLog(targetClass);
		String username = null;
		try {
			SecurityContext securityContext = SecurityContextHolder.getContext();
			username = securityContext.getAuthentication().getName();
		} catch (Exception e) {
			username = null;
		}
		loggerTaskExecutor.execute(new LoggerTask(logger, message, username, ex));
	}
	
	private  class LoggerTask implements Runnable {

		private String message = null;
		private Log logger = null;
		private Throwable ex = null;

		public LoggerTask(Log logger, String message, String username, Throwable ex) {
			this.logger = logger;
			if (username!=null) {
				this.message = message;
			} else {
				this.message = message + " - User: " + username;
			}
			this.ex = ex;
		}

		public void run() {
			if (this.ex != null) {
				this.logger.error(this.message, this.ex);
			} else {
				if (this.logger.isInfoEnabled()) {
					this.logger.info(this.message);
				}
			}
		}
	}

}
