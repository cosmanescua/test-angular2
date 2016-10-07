package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.AmReportBookings;

public interface IAmReportBookingsHome {
	public static final String REPOSITORY_QUALIFIER = "amReportBookingsHome";

	public void persist(AmReportBookings transientInstance);

	public void attachDirty(AmReportBookings instance);

	public void attachClean(AmReportBookings instance);

	public void delete(AmReportBookings persistentInstance);

	public AmReportBookings merge(AmReportBookings detachedInstance);

	public AmReportBookings findById(Integer id);
}
