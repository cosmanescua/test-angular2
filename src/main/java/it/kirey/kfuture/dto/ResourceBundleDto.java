package it.kirey.kfuture.dto;

import java.util.List;

import javax.validation.Valid;

import org.hibernate.validator.constraints.NotEmpty;

import it.kirey.kfuture.entity.ResourceBundle;

public class ResourceBundleDto {

	@Valid
	@NotEmpty
	private List<ResourceBundle> list;

	public List<ResourceBundle> getList() {
		return list;
	}

	public void setList(List<ResourceBundle> list) {
		this.list = list;
	}
}
