package it.kirey.kfuture.dto;

import java.io.Serializable;

public class TestObject implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3338364520218104132L;

	int testId;

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	@Override
	public String toString() {
		return "TestObject [testId=" + testId + "]";
	}

}
