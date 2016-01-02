package com.yarraa.business;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

import org.apache.poi.POIXMLDocument;
import org.apache.poi.POIXMLException;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.google.gson.Gson;
import com.yarraa.dao.util.ConnectionUtil;
import com.yarraa.upload.vo.WarrantyInfo;


public class ProductUpload {
	
	ArrayList<WarrantyInfo> alWarranties=new ArrayList<WarrantyInfo>();
	
	public String uploadWarranty(InputStream is, String fileType, Map<String, String> headers) throws Exception {

	//	Connection con = ConnectionUtil.getConnection();
		XSSFWorkbook Xworkbook = null;
		HSSFWorkbook Hworkbook = null;
		Iterator<Row> rowIterator = null;
					
			//FileInputStream file = (FileInputStream)is;
			//System.out.println(POIXMLDocument.hasOOXMLHeader(new BufferedInputStream( file)));
			System.out.println(fileType);
			if(fileType.equals("XLSX"))
			{
				Xworkbook = new XSSFWorkbook(new BufferedInputStream( is));
				XSSFSheet sheet = Xworkbook.getSheetAt(0);
				rowIterator = sheet.iterator();
			}				
			else if(fileType.equals("XLS"))
			{	
				
				Hworkbook = new HSSFWorkbook(new BufferedInputStream( is));
				HSSFSheet sheet = Hworkbook.getSheetAt(0);
				rowIterator = sheet.iterator();
				
			}
			
			
			while(rowIterator.hasNext())
			{
				
				Row row = rowIterator.next();
				if(row.getRowNum() > 0)
				{
					WarrantyInfo objWarrantyInfo=new WarrantyInfo();
					
					Cell cell = row.getCell(0);
					String brandName = cell.getStringCellValue();
					objWarrantyInfo.setBrandName(brandName);
					cell = row.getCell(1);
					String productType = cell.getStringCellValue();
					objWarrantyInfo.setProductType(productType);
					cell = row.getCell(2);
					String modelName = cell.getStringCellValue();
					objWarrantyInfo.setModelName(modelName);
					cell = row.getCell(3);
					String serialNo = cell.getStringCellValue();
					objWarrantyInfo.setSerialNo(serialNo);
					cell = row.getCell(4);
					double cost = cell.getNumericCellValue();
					objWarrantyInfo.setCost(cost);
					cell = row.getCell(5);
					String billNo = cell.getStringCellValue();
					objWarrantyInfo.setBillNo(billNo);
					cell = row.getCell(6);
					String country = cell.getStringCellValue();
					objWarrantyInfo.setCountry(country);
					cell = row.getCell(7);
					String purchasedFrom = cell.getStringCellValue();
					objWarrantyInfo.setPurchasedFrom(purchasedFrom);
					cell = row.getCell(8);
					int warrantyPeriod = (int)cell.getNumericCellValue();
					objWarrantyInfo.setWarrantyPeriod(warrantyPeriod);
					cell = row.getCell(9);
					long warrantyStartDate = (long)cell.getNumericCellValue();
					objWarrantyInfo.setWarrantyStartDate(warrantyStartDate);
					cell = row.getCell(10);
					String warrantyNo = cell.getStringCellValue();
					objWarrantyInfo.setWarrantyNo(warrantyNo);
					cell = row.getCell(11);
					String currencyCode = cell.getStringCellValue();
					objWarrantyInfo.setCurrencyCode(currencyCode);
					
					alWarranties.add(objWarrantyInfo);
					
					
				}
		}
			Gson gson=new Gson();
			String strJSON=gson.toJson(alWarranties);
			ArrayList<String> alFrom=new ArrayList<String>();
			alFrom.add("brandName");
			alFrom.add("productType");
			alFrom.add("modelName");
			alFrom.add("serialNo");
			alFrom.add("cost");
			alFrom.add("billNo");
			alFrom.add("country");
			alFrom.add("purchasedFrom");
			alFrom.add("warrantyPeriod");
			alFrom.add("warrantyStartDate");
			alFrom.add("warrantyNo");
			alFrom.add("currencyCode");

			ArrayList<String> alTo=new ArrayList<String>();
			alTo.add("brand_name");
			alTo.add("product_type");
			alTo.add("model_name");
			alTo.add("serial_no");
			alTo.add("cost");
			alTo.add("bill_no");
			alTo.add("country");
			alTo.add("purchased_from");
			alTo.add("warranty_period");
			alTo.add("warranty_start_date");
			alTo.add("warranty_no");
			alTo.add("currency_code");
			for(int i=0; i<alFrom.size(); i++) {
				strJSON=strJSON.replace(alFrom.get(i).toString(), alTo.get(i).toString());
			}
			System.out.println(strJSON);
			return strJSON;
			
		
	}

	public String saveProducts(String strJSON, Map<String, String> headers) throws Exception {
		String url = AppConstants.REST_URL + "/warranties/upload";	
		
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		
		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
		con.setRequestProperty("Content-Type", "application/json");
		
		con.setRequestProperty("Authorization",headers.get("Authorization"));
		
		
		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		
	
		wr.writeBytes(strJSON.toString());
		wr.flush();
	
		wr.close();
		
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);		
		System.out.println("Response Code : " + responseCode);
		
		BufferedReader in = new BufferedReader(
		new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response1 = new StringBuffer();
		
		//ServletOutputStream sout = response.getOutputStream();
		
		while ((inputLine = in.readLine()) != null) {
			response1.append(inputLine);
		
		}
		in.close();
		
		//System.out.println(response1);
		return response1.toString();
		
	}


}
