package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.AmReportBookingParameters;

public interface IAmReportBookingParametersHome {
	public static final String REPOSITORY_QUALIFIER = "amReportBookingParametersHome";

	public void persist(AmReportBookingParameters transientInstance);

	public void attachDirty(AmReportBookingParameters instance);

	public void attachClean(AmReportBookingParameters instance);

	public void delete(AmReportBookingParameters persistentInstance);

	public AmReportBookingParameters merge(AmReportBookingParameters detachedInstance);

	public AmReportBookingParameters findById(Integer id);
}
