package it.kirey.kfuture.jobs;

import java.util.Calendar;

import org.springframework.stereotype.Component;

@Component(value = "exampleJob")
public class ExampleJob {
	
	public void work() {
	    System.out.println("Test 1 at "+ Calendar.getInstance().getTime());  
	    
	}
}
