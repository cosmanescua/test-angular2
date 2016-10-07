package it.kirey.kfuture.scheduler;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ScheduledFuture;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.support.CronSequenceGenerator;
import org.springframework.stereotype.Component;

import it.kirey.kfuture.dao.IAmTaskSchedulersHome;

public class DynamicScheduler implements Trigger {

	private TaskScheduler scheduler;
	private Runnable task;
	private ScheduledFuture<?> scheduledFuture;
	private String cronExpression;
	private String status;
	private Date nextExecutionTime;
	private String jobName;
	private IAmTaskSchedulersHome amTaskSchedulersHome;

	private static final Log log = LogFactory.getLog(DynamicScheduler.class);

	public DynamicScheduler(TaskScheduler scheduler, Runnable task, IAmTaskSchedulersHome amTaskSchedulersHome, String jobName) {
		cronExpression = amTaskSchedulersHome.getCronExpression(jobName);
		this.amTaskSchedulersHome = amTaskSchedulersHome;
		this.jobName = jobName;
		this.scheduler = scheduler;
		this.task = task;
		reset(cronExpression);
	}
	
	@Override
	public Date nextExecutionTime(TriggerContext triggerContext) {
		status = "COMPLETED";

		CronSequenceGenerator cronSequenceGenerator = new CronSequenceGenerator(cronExpression,
				Calendar.getInstance().getTimeZone());

		Date lastExecutionTime = triggerContext.lastScheduledExecutionTime();
		if (lastExecutionTime == null) {
			lastExecutionTime = Calendar.getInstance().getTime();
		}

		this.nextExecutionTime = cronSequenceGenerator.next(lastExecutionTime);

		System.out.println("DynamicSchedule -- chronExpression: " + cronExpression + ", lastScheduledExecutionTime: " + lastExecutionTime
				+ "; nextExecutionTime: " + this.nextExecutionTime);
		return this.nextExecutionTime;
	}

	public void cancel() {
		if (scheduledFuture != null && !getStatus().equals("RUNNING")) {
			System.out.println("Cancelling task...");
			scheduledFuture.cancel(true);
		}
		this.nextExecutionTime = null;
		this.cronExpression = "";
	}

	public void start(String cronExpression) {
		this.cancel();
		this.cronExpression = cronExpression;


		/* persisto la nuova cronExpression */
		try {
			new CronSequenceGenerator(cronExpression, Calendar.getInstance().getTimeZone());
			amTaskSchedulersHome.updateCronExpression(jobName, cronExpression);
		} catch (IllegalArgumentException iaex) {
			// TODO scrivere l'errore su DB
		}

		System.out.println("Starting task...");
		scheduledFuture = scheduler.schedule(task, this);

	}

	public void running() {
		status = "RUNNING";
	}

	public String getStatus() {
		if (scheduledFuture.isCancelled()) {
			return "CANCELLED";
		}
		return status;
	}

	public void reset(String chronExpression) {
		this.cancel();
		this.start(chronExpression);
	}

	public Date nextExecutionTime() {
		return this.nextExecutionTime;
	}

	

	public String getCronExpression() {
		return this.cronExpression;
	}
}
