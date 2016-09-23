package it.kirey.kfuture.processor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import it.kirey.kfuture.jobs.Example2Job;
import it.kirey.kfuture.scheduler.DynamicScheduler;


public class Example2Processor {

	@Autowired
	@Qualifier("example2DynamicScheduler")
	/* id del processo in Spring */
	private DynamicScheduler dynamicScheduler;

	@Autowired
	/* id del job in Spring */
	private Example2Job example2Job;

	public void process() {
		try {
			dynamicScheduler.running(); /* imposta a RUNING il processo */

			example2Job.work(); /* chiama il work del Example2Job */

		} catch (Exception ex) {

		}
	}
}
