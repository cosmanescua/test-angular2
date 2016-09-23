package it.kirey.kfuture.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class BatchConfigsId implements java.io.Serializable {

	private String value;
	private String category;

	public BatchConfigsId() {
	}

	public BatchConfigsId(String value, String category) {
		this.value = value;
		this.category = category;
	}

	@Column(name = "value", nullable = false, length = 25)
	public String getValue() {
		return this.value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Column(name = "category", nullable = false, length = 200)
	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof BatchConfigsId))
			return false;
		BatchConfigsId castOther = (BatchConfigsId) other;

		return ((this.getValue() == castOther.getValue()) || (this.getValue() != null && castOther.getValue() != null
				&& this.getValue().equals(castOther.getValue())))
				&& ((this.getCategory() == castOther.getCategory()) || (this.getCategory() != null
						&& castOther.getCategory() != null && this.getCategory().equals(castOther.getCategory())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getValue() == null ? 0 : this.getValue().hashCode());
		result = 37 * result + (getCategory() == null ? 0 : this.getCategory().hashCode());
		return result;
	}

}
