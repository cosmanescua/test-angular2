package it.kirey.kfuture.dao;

import it.kirey.kfuture.entity.AmReportBlobs;

public interface IAmReportBlobsHome{
	public static final String REPOSITORY_QUALIFIER = "amReportBlobsHome";
	public AmReportBlobs getBlobFileByReportId(Integer reportId);
	
	public void persist(AmReportBlobs transientInstance);

	public void attachDirty(AmReportBlobs instance);

	public void attachClean(AmReportBlobs instance);

	public void delete(AmReportBlobs persistentInstance);

	public AmReportBlobs merge(AmReportBlobs detachedInstance);

	public AmReportBlobs findById(Integer id);
}
