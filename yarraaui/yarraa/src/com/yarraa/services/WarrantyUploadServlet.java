package com.yarraa.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.yarraa.business.WarrantyUpload;

@MultipartConfig
public class WarrantyUploadServlet extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		Collection<Part> requestPart= req.getParts();
		//Iterator<Part> it = requestPart.iterator();
		InputStream is = null;
		System.out.println("requestPart = " + requestPart);
		for(Part p : requestPart)
		{			
			if("file".equals(p.getName()))
			{
				is = p.getInputStream();
			}
			//System.out.println(p);
			
		}
		System.out.println("is : " +is);
		
		String company_id = req.getParameter("company_id");
		String user_id = req.getParameter("user_id");
		
		System.out.println("company_id" + company_id);
		System.out.println("user_id" + user_id);
		WarrantyUpload wp = new WarrantyUpload();
		String result = "{}";
		try {
			wp.uploadWarranty(is, company_id, user_id);
			result = "{\"status\":\"success\",\"code\":1}";
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
