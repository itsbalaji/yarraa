package com.yarraa.business;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;

import com.yarraa.dao.util.ConnectionUtil;
import com.yarraa.upload.vo.PlanFeaturesVO;
import com.yarraa.upload.vo.PlanVO;

public class WarrantyUpload {
	
	private static int PLANS_START_INDEX = 6;
	private static int PLANS_END_INDEX = -1;
	
	
	
	
	public void uploadWarranty(InputStream is) {
		// TODO Auto-generated method stub
		Connection con = ConnectionUtil.getConnection();
		HSSFWorkbook workbook = null;
		try {
			
			
			FileInputStream file = (FileInputStream)is;
			workbook = new HSSFWorkbook(file);
			HSSFSheet sheet = workbook.getSheetAt(1);
			Iterator<Row> rowIterator = sheet.iterator();
			
			Map<String, String> products = new HashMap<String, String>();
			Map<String, String> planType = new HashMap<String, String>();
			
			
			/*
			 * Unique identifier is created to indentify the records created in this thread.
			 */
			Random r = new Random();
			int uniqueThreadIdentifier = r.nextInt();
			
			
			/*
			 * Get the number of plans in the sheet, this is found by the colspan of the merged title in row 1 adn column 6
			 */
			List<CellRangeAddress> merged = sheet.getMergedRegions();
			
			for(CellRangeAddress cra : merged)
			{
				if( cra.getFirstRow() == 0)
				{
					if(cra.getFirstColumn() == PLANS_START_INDEX)
					{
						PLANS_END_INDEX = cra.getLastColumn();
					}
				}					
			}
			
			System.out.println("PLANS_END_INDEX = "+ PLANS_END_INDEX);
			

			/*
			 * Get the title of the plans in the sheet
			 */
			
			List<String> planTypeList = new ArrayList<String>();
			Row secondRow = sheet.getRow(1);
			for(int i = PLANS_START_INDEX; i<= PLANS_END_INDEX;i++)
			{
				Cell cell = secondRow.getCell(i);
				if(cell.getCellType() !=  Cell.CELL_TYPE_BLANK){
					
					String planTypeString = cell.getStringCellValue().trim().toUpperCase();
					planType.put(planTypeString, null);
					planTypeList.add(planTypeString);
					
				}
			}
			System.out.println(planType);
			
			
			/*
			 * Iterate all rows through first column to get the different products. 
			 * each cell can contain multiple products separated by comma.
			 */
			
			while(rowIterator.hasNext())
			{
				Row row = rowIterator.next();
				Cell cell = row.getCell(0);
				if(cell.getCellType() !=  Cell.CELL_TYPE_BLANK){
					
					String productValue = cell.getStringCellValue();
					if(productValue.indexOf("(") > -1)
					{
						productValue = productValue.substring(productValue.indexOf("(")+1, productValue.indexOf(")"));
						
					}
					String[] prouctNames = productValue.split(",");
					for(String prod : prouctNames)
					{
						products.put(prod.trim().toUpperCase(), null);
					}
					
					
					
				}
				
								
			}
			
			/*
			 * For all the products taken above from the sheet, get the product id from table. 
			 * If ID not avilable then insert as new product and get the ID			 * 
			 */
			getsertProductDetails(products, con);
			
			
			/*
			 * Iterate through the sheet and get all plan details and insert into the table.
			 *  
			 */
			List<PlanVO> lstPlans = getNewProductPlans(products, sheet, planTypeList, con);
			insertNewPlans(lstPlans,uniqueThreadIdentifier, con);
			
			
			/**
			 * Process features sheet
			 */
			sheet = workbook.getSheetAt(2);
			
			
			processServiceDescription(sheet, uniqueThreadIdentifier, con);
			
			
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			try {
				if(workbook != null)
					workbook.close();
				is.close();
				ConnectionUtil.closeConnection(con);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


	private void processServiceDescription(HSSFSheet sheet, int uniqueThreadIdentifier, Connection con) {

		/**
		 * Iterate and get features list
		 */
		Iterator<Row> rowIterator = sheet.rowIterator();
		Map<String, String> featuresMap = new HashMap<String,String>();
		while(rowIterator.hasNext())
		{
			
			Row row = rowIterator.next();
			
			if(row.getRowNum() < 2)
			{
				continue;
			}
			
			
			Cell cell = row.getCell(0);
			if(cell.getCellType() !=  Cell.CELL_TYPE_BLANK){				
				featuresMap.put(cell.getStringCellValue().toUpperCase(), "");
			}
			else
			{
				break;
			}
		}
		
		/**
		 * If features not available insert into feature master and get the ids
		 */
		getsertFeatures(featuresMap, con);
		
		/**
		 * Get the plans type and the applicable features based on plan types - EW/ADP/EW+ADP
		 * 
		 **/
		List<List<String>> responseList = getPlanFeatures(sheet, featuresMap, con);
		
		/**
		 * Based on the features applied to plan types (EW/ADP/EW+ADP), insert the mapping for the featues and the plans
		 * inserted from sheet 1
		 * 
		 **/
		
		getInsertedPlans(responseList, uniqueThreadIdentifier, con);
		
		
	}


	private void getInsertedPlans(List<List<String>> responseList, int uniqueThreadIdentifier, Connection con) {
		try {
			
			String EW_PLAN_QUERY  = "select PLAN_ID,PLAN_TITLE, COMPANY_ID from RST_EW_PLAN_LIST where ADDITIONAL_INFO like '"+uniqueThreadIdentifier+":%'";
			
			
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(EW_PLAN_QUERY);
			
			List<String> ewFeatureList = responseList.get(0);
			List<String> adpFeatureList = responseList.get(1);
			List<String> ewadpFeatureList = responseList.get(2);
			
			List<PlanFeaturesVO> lst = new ArrayList<PlanFeaturesVO>();
			int i=0;
			while(rs.next())
			{
				i++;
				String planId = rs.getString(1);
				String planTitle = rs.getString(2);
				String companyId = rs.getString(3);
				
				
				
				if(planTitle.toUpperCase().indexOf("EW") > -1 && planTitle.toUpperCase().indexOf("ADP") > -1)
				{
					for(String featureId : ewadpFeatureList)
					{
						PlanFeaturesVO vo = new PlanFeaturesVO();
						vo.setCompanyId(companyId);
						vo.setFeatureId(featureId);
						vo.setPlanId(planId);
						lst.add(vo);
					}					
				}				
				else if(planTitle.toUpperCase().indexOf("EW") > -1)
				{
					for(String featureId : ewFeatureList)
					{
						PlanFeaturesVO vo = new PlanFeaturesVO();
						vo.setCompanyId(companyId);
						vo.setFeatureId(featureId);
						vo.setPlanId(planId);
						lst.add(vo);
					}					
				}
				else if(planTitle.toUpperCase().indexOf("ADP") > -1)
				{
					for(String featureId : adpFeatureList)
					{
						PlanFeaturesVO vo = new PlanFeaturesVO();
						vo.setCompanyId(companyId);
						vo.setFeatureId(featureId);
						vo.setPlanId(planId);
						lst.add(vo);
					}					
				}
				
				
				
			}
			rs.close();
			st.close();
			System.out.println("No of plans : " + i);
			
			insertPlansApplFeature(lst, con);
			
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}


	private void insertPlansApplFeature(List<PlanFeaturesVO> lst, Connection con) {
		try
		{
			PreparedStatement pst = con.prepareStatement("insert into RST_EW_PLAN_APPL_FEATURES "
					+ "(PLAN_ID, COMPANY_ID, FEATURE_ID) values (?,?,?)");
			
			for(PlanFeaturesVO vo : lst)
			{
				pst.setString(1, vo.getPlanId());
				pst.setString(2, vo.getCompanyId());
				pst.setString(3, vo.getFeatureId());
				pst.addBatch();
			}
			int[] result = pst.executeBatch();
			System.out.println(result.length + " feature records mapped");
			
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		
	}


	private List<List<String>> getPlanFeatures(HSSFSheet sheet,Map<String, String> featuresMap, Connection con) {
		Iterator<Row> rowIterator = sheet.rowIterator();
		List<String> ewFeatureList = new ArrayList<String>();
		List<String> adpFeatureList = new ArrayList<String>();
		List<String> ewadpFeatureList = new ArrayList<String>();
		List<List<String>> responseList = new ArrayList<List<String>>();
		while(rowIterator.hasNext())
		{
			Row row = rowIterator.next();
			if(row.getRowNum() < 2)
			{
				continue;
			}
			else
			{
				Cell c0 = row.getCell(0);
				if(c0.getCellType() !=  Cell.CELL_TYPE_BLANK){				
					String featureName = c0.getStringCellValue().toUpperCase();
					String featureId = featuresMap.get(featureName);
					Cell c1 = row.getCell(1);
					if(c1.getCellType() !=  Cell.CELL_TYPE_BLANK ){
						String cellValue = c1.getStringCellValue().trim();
						if(!cellValue.equalsIgnoreCase("NO"))
						{
							ewFeatureList.add(featureId);
						}
					}
					
					Cell c2 = row.getCell(2);
					if(c2.getCellType() !=  Cell.CELL_TYPE_BLANK ){
						String cellValue = c2.getStringCellValue().trim();
						if(!cellValue.equalsIgnoreCase("NO"))
						{
							adpFeatureList.add(featureId);
						}
					}
					
					Cell c3 = row.getCell(3);
					if(c3.getCellType() !=  Cell.CELL_TYPE_BLANK ){
						String cellValue = c3.getStringCellValue().trim();
						if(!cellValue.equalsIgnoreCase("NO"))
						{
							ewadpFeatureList.add(featureId);
						}
					}
					
				}
			}
			
		}
		responseList.add(ewFeatureList);
		responseList.add(adpFeatureList);
		responseList.add(ewadpFeatureList);
		return responseList;
	}


	private void getsertFeatures(Map<String, String> featuresMap, Connection con) {		
			
			Set<String> featuresList = featuresMap.keySet();
			String queryCriteria = "";
			for(String s : featuresList)
			{
				if(!queryCriteria.equals(""))
				{
					queryCriteria = queryCriteria + ",";
				}
				queryCriteria = queryCriteria + "'"+s.replaceAll("'", "''")+"'";
				
			}
			String GET_QUERY = "select FEATURE_ID, NAME_OF_THE_FEATURE from RST_EW_PLAN_FEATURES_MASTER "
					+ " where upper(NAME_OF_THE_FEATURE)  in ("
					+  queryCriteria + ")";
			System.out.println("GET_QUERY = "+GET_QUERY);
			try {
				Statement st = con.createStatement();
				ResultSet rs = st.executeQuery(GET_QUERY);
				while(rs.next())
				{
					featuresMap.put(rs.getString(2), rs.getString(1));				
				}
				
				rs.close();
				st.close();
				
				PreparedStatement pst = con.prepareStatement(
						"insert into RST_EW_PLAN_FEATURES_MASTER (NAME_OF_THE_FEATURE) values (?)");
				boolean doInsert = false;
				
				featuresList = featuresMap.keySet();			
				for(String s : featuresList)
				{					
					if(featuresMap.get(s) == null || featuresMap.get(s).equals(""))
					{
						pst.setString(1, s.toUpperCase());
						pst.addBatch();
						doInsert = true;
					}
					
				}
				if(doInsert)
				{
					int result[] = pst.executeBatch();
					System.out.println(result.length);
				
				
					pst.close();
					
					st = con.createStatement();
					System.out.println("GET_QUERY = "+GET_QUERY);
					rs = st.executeQuery(GET_QUERY);
					while(rs.next())
					{
						
						featuresMap.put(rs.getString(2), rs.getString(1));				
					}
					
					rs.close();
					st.close();
				}
				System.out.println("featuresMap = " + featuresMap);
				
				
				
				
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			
			
		
		
	}


	private void insertNewPlans(List<PlanVO> lstPlans, int uniqueThreadIdentifier, Connection con) {
		
		try
		{
			PreparedStatement pst = con.prepareStatement("insert into RST_EW_PLAN_LIST ("
					+ "PLAN_TITLE, COMPANY_ID, CREATED_BY, CREATED_ON, PLAN_SELLING_PRICE, CURRENCY_OF_SELLING_PRICE,"
					+ "MIN_PRODUCT_COST, CURRENCY_OF_MIN_PRODUCT_COST, "
					+ "MAX_PRODUCT_COST, CURRENCY_OF_MAX_PRODUCT_COST, ADDITIONAL_INFO) "
					+ "VALUES (?,?,?,sysdate,?,?,?,?,?,?,?)");
			
			
			
			for(PlanVO vo : lstPlans)
			{
				pst.setString(1, vo.getPlanTitle());
				pst.setInt(2, vo.getCompanyId());
				pst.setInt(3, vo.getCreatorId());
				pst.setDouble(4, vo.getSellingPrice());
				pst.setString(5, vo.getSellingPriceCurrency());
				pst.setDouble(6, vo.getMinCost());
				pst.setString(7, vo.getMinCostCurrency());
				pst.setDouble(8, vo.getMaxCost());
				pst.setString(9, vo.getMaxCostCurrency());
				pst.setString(10, uniqueThreadIdentifier+":"+vo.getDetails());
				pst.addBatch();
				
			}
			
			int[] batchResult = pst.executeBatch();
			System.out.println(batchResult.length + " Plans Inserted");
			
			pst.close();
			
			/**
			 * After plans insertion; insert plans and products mapping. 
			 * At this point uniqueThreadIdentifier and the details in ADDITIONAL_INFO field is used
			 */
			
			insertProdutApplPlans(lstPlans.get(0).getCompanyId(),uniqueThreadIdentifier,con);
			
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}


	private void insertProdutApplPlans(int companyId, int uniqueThreadIdentifier, Connection con) {
		try
		{
			Statement st = con.createStatement();
			String currentRecordFetch = "select PLAN_ID, ADDITIONAL_INFO from RST_EW_PLAN_LIST where COMPANY_ID="+companyId+
					" and ADDITIONAL_INFO like '"+uniqueThreadIdentifier + ":%'";
			ResultSet rs = st.executeQuery(currentRecordFetch);
			
			/**
			 * For each products in ADDITIONAL_INFO field, mapping is made in RST_EW_PLAN_APPL_PRODUCTS
			 */
			
			PreparedStatement pst = con.prepareStatement("insert into RST_EW_PLAN_APPL_PRODUCTS (PLAN_ID, COMPANY_ID, PRODUCT_ID) values (?,?,?)"); 
			while(rs.next())
			{
				
				String desc = rs.getString(2);
				desc = desc.substring(desc.indexOf(":") + 1);
				String productIds[] = desc.split("#");
				for(String id : productIds)
				{
					pst.setString(1,  rs.getString(1));
					pst.setInt(2, companyId);
					pst.setString(3, id);
					pst.addBatch();
				}
				
			}
			int result[] = pst.executeBatch();
			System.out.println(result.length);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}


	private List<PlanVO> getNewProductPlans(Map<String, String> products, HSSFSheet sheet,
			List<String> planTypeList, Connection con) {
		
		Iterator<Row> rowIterator = sheet.rowIterator();
		
		List<PlanVO> lstPlans = new ArrayList<PlanVO>();
		
		
		/*
		 * Iterate through the sheet and get all plan details.
		 *  
		 */
		while(rowIterator.hasNext())
		{
			
			Row row = rowIterator.next();
			
			if(row.getRowNum() < 3)
			{
				continue;
			}
			
			List<String> productList = new ArrayList<String>();
			Cell cell = row.getCell(0);
			if(cell.getCellType() !=  Cell.CELL_TYPE_BLANK){
				
				String productValue = cell.getStringCellValue();
				if(productValue.indexOf("(") > -1)
				{
					productValue = productValue.substring(productValue.indexOf("(")+1, productValue.indexOf(")"));
					
				}
				String[] prouctNames = productValue.split(",");
				
				 
				for(String prod : prouctNames)
				{
					productList.add(prod.trim().toUpperCase());
				}
				
				/*
				 * Each row contains many plans details, so iterating across columns to get all plan details
				 *  
				 */
				
				for(int i=PLANS_START_INDEX, pos=0; i<=PLANS_END_INDEX; i = i+2, pos++)
				{
					if(row.getCell(i+1).getCellType() != Cell.CELL_TYPE_BLANK && 
							row.getCell(i+1).getCellType() == Cell.CELL_TYPE_NUMERIC )
					{
						PlanVO vo = new PlanVO();
						vo.setMinCost(row.getCell(5).getNumericCellValue());
						vo.setMaxCost(row.getCell(6).getNumericCellValue());
						//row.getCell(i);
						vo.setSellingPrice(row.getCell(i+1).getNumericCellValue());						
						vo.setPlanTitle(planTypeList.get(pos));
						vo.setMinCostCurrency("SGD");
						vo.setMaxCostCurrency("SGD");
						vo.setSellingPriceCurrency("SGD");
						vo.setCreatorId(111213);
						vo.setCompanyId(111213);
						
						String productIds = "";
						for(String product : productList)
						{
							productIds = productIds + products.get(product) +"#";
						}
						
						/*
						 * this details field mapped to ADDITIONAL_INFO in table is required to identify for which products the plans are inserted.
						 * The reason for having this field is that until the records are inserted into table plan id will not be known.
						 * so inorder to map the plans and products this details will be used after plans are inserted into plan table.
						 *  
						 */
						vo.setDetails(productIds);
						lstPlans.add(vo);
					}
										
				}
				
			}
			
							
		}
		System.out.println(lstPlans.size());
		return lstPlans;
		
		
		
	}


	private void getsertProductDetails(Map<String, String> products, Connection con) {
		
		
		/**
		 * Check for products available in table
		 */
		Set<String> productList = products.keySet();
		String queryCriteria = "";
		for(String s : productList)
		{
			if(!queryCriteria.equals(""))
			{
				queryCriteria = queryCriteria + ",";
			}
			queryCriteria = queryCriteria + "'"+s+"'";
			
		}
		String GET_QUERY = "select PRODUCT_ID, SUB_CATEGORY from RST_PRODUCT_MASTER where upper(SUB_CATEGORY) in ("
				+  queryCriteria + ")";
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(GET_QUERY);
			while(rs.next())
			{
				products.put(rs.getString(2), rs.getString(1));				
			}
			
			rs.close();
			st.close();
			
			st = con.createStatement();
			boolean doInsert = false;
			
			
			/**
			 * If products not available in table, then insert new products
			 */
			
			productList = products.keySet();			
			for(String s : productList)
			{
				if(products.get(s) == null)
				{
					st.addBatch(
							"insert into RST_PRODUCT_MASTER (SUB_CATEGORY, MODEL_ID, CREATED_BY, CREATED_DT) "
							+ "values ('"+s+"',0,111213,sysdate)");
					doInsert = true;
				}
				
			}
			if(doInsert)
			{
				st.executeBatch();
			
			
				st.close();
				
				
				/**
				 * Get the product id after inserting new products
				 */
				
				st = con.createStatement();
				System.out.println("GET_QUERY = "+GET_QUERY);
				rs = st.executeQuery(GET_QUERY);
				while(rs.next())
				{
					System.out.println(rs.getString(2) + "=" + rs.getString(1));
					products.put(rs.getString(2), rs.getString(1));				
				}
				
				rs.close();
				st.close();
			}

			
			
			
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		
	}

}
