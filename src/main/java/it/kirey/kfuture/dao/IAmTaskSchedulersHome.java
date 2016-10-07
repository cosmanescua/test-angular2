package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.AmTaskSchedulers;

public interface IAmTaskSchedulersHome{
	public static final String REPOSITORY_QUALIFIER = "amTaskSchedulersHome";
	public String getCronExpression(String idTrigger);
	public void updateCronExpression(String idTrigger, String cronExpression);
	public AmTaskSchedulers getTaskSchedulerByName(String schedulerName);
}
