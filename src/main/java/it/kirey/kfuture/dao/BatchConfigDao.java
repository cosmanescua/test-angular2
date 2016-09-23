package it.kirey.kfuture.dao;

public interface BatchConfigDao {
	public String findCronExpression(String idTrigger) ;
	public void updateCronExpression(String idTrigger, String cronExpression);
}
