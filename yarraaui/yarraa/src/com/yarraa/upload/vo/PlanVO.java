package com.yarraa.upload.vo;

public class PlanVO {
	
	private String planTitle;
	private int companyId;
	private Double minCost;
	private String minCostCurrency;
	private Double maxCost;
	private String maxCostCurrency;
	private Double sellingPrice;
	private String sellingPriceCurrency;
	private String details;
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getSellingPriceCurrency() {
		return sellingPriceCurrency;
	}
	public void setSellingPriceCurrency(String sellingPriceCurrency) {
		this.sellingPriceCurrency = sellingPriceCurrency;
	}
	private int creatorId;
	
	
	public int getCreatorId() {
		return creatorId;
	}
	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}
	public String getMinCostCurrency() {
		return minCostCurrency;
	}
	public void setMinCostCurrency(String minCostCurrency) {
		this.minCostCurrency = minCostCurrency;
	}
	public String getMaxCostCurrency() {
		return maxCostCurrency;
	}
	public void setMaxCostCurrency(String maxCostCurrency) {
		this.maxCostCurrency = maxCostCurrency;
	}
	
	public String getPlanTitle() {
		return planTitle;
	}
	public void setPlanTitle(String planTitle) {
		this.planTitle = planTitle;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	public Double getMinCost() {
		return minCost;
	}
	public void setMinCost(Double minCost) {
		this.minCost = minCost;
	}
	public Double getMaxCost() {
		return maxCost;
	}
	public void setMaxCost(Double maxCost) {
		this.maxCost = maxCost;
	}
	public Double getSellingPrice() {
		return sellingPrice;
	}
	public void setSellingPrice(Double sellingPrice) {
		this.sellingPrice = sellingPrice;
	}
	
	

}
