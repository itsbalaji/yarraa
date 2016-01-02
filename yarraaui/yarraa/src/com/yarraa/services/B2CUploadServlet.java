package com.yarraa.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.yarraa.business.ProductUpload;
import com.yarraa.business.WarrantyUpload;

@MultipartConfig
public class B2CUploadServlet extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		Collection<Part> requestPart= req.getParts();
		//Iterator<Part> it = requestPart.iterator();
		InputStream is = null;
		System.out.println("requestPart = " + requestPart);
		String fileType = null;
		for(Part p : requestPart)
		{			
			if("file".equals(p.getName()))
			{
				is = p.getInputStream();
				String contentDisposition = p.getHeader("content-disposition");
				if(contentDisposition != null && contentDisposition.toUpperCase().indexOf(".XLSX") > -1)
				{
					fileType = "XLSX";
				}
				else if(contentDisposition != null && contentDisposition.toUpperCase().indexOf(".XLS") > -1)
				{
					fileType = "XLS";
				}
				
			}
			//System.out.println(p);
			
		}
		
		
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Authorization", req.getHeader("Authorization"));
		
		
		ProductUpload pu = new ProductUpload();
		String result = "{}";
		try {
			String json = pu.uploadWarranty(is, fileType, headers);
			String response = null;
			if(json != null)
			{
				response = pu.saveProducts(json, headers);
			}
			if(response != null && response.indexOf("\"status\":\"success\"") > -1)
			{
					result = "{\"status\":\"success\",\"code\":1}";
			}
			else
			{
				result = "{\"status\":\"failure\",\"code\":0}";
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result = "{\"status\":\"failure\",\"code\":0}";
			e.printStackTrace();
		}
		resp.setContentType("application/json");
		resp.getOutputStream().write(result.getBytes());
		resp.getOutputStream().close();
	}

}
