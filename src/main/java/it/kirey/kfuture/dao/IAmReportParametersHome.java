package it.kirey.kfuture.dao;

import java.util.List;

import it.kirey.kfuture.entity.AmReportParameters;

public interface IAmReportParametersHome {
	public static final String REPOSITORY_QUALIFIER = "amReportParametersHome";

	public void persist(AmReportParameters transientInstance);

	public void attachDirty(AmReportParameters instance);

	public void attachClean(AmReportParameters instance);

	public void delete(AmReportParameters persistentInstance);

	public AmReportParameters merge(AmReportParameters detachedInstance);

	public AmReportParameters findById(Integer id);

	List<AmReportParameters> getAll();
}
