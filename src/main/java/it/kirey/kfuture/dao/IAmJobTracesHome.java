package it.kirey.kfuture.dao;

public interface IAmJobTracesHome{
	public static final String REPOSITORY_QUALIFIER = "amJobTracesHome";
	public Integer countJobTraces(String schedulerName, String jobStatus);
}
