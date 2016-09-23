package it.kirey.kfuture.jobs;

import java.util.Calendar;

import org.springframework.stereotype.Component;

@Component(value = "example2Job")
public class Example2Job {

	public void work() {

		System.out.println("Test 2 at " + Calendar.getInstance().getTime());

	}

}
