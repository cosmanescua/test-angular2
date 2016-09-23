package it.kirey.kfuture.processor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import it.kirey.kfuture.jobs.ExampleJob;
import it.kirey.kfuture.scheduler.DynamicScheduler;


public class ExampleTaskProcessor {

	@Autowired
	@Qualifier("exampleDynamicScheduler")
	/* id del processo in Spring */
	private DynamicScheduler dynamicScheduler;

	@Autowired
	/* id del job in Spring */
	private ExampleJob exampleJob;

	public void process() {
		try {
			dynamicScheduler.running(); /* imposta a RUNING il processo */
		
			exampleJob.work(); /* chiama il work del Example11Job */

		} catch (Exception ex) {

		}
	}
}
