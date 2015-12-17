package com.yarraa.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.yarraa.business.WarrantyUpload;

public class WarrantyUploadServlet extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		Collection<Part> requestPart= req.getParts();
		//Iterator<Part> it = requestPart.iterator();
		InputStream is = null;
		for(Part p : requestPart)
		{			
			is = p.getInputStream();
		}
		WarrantyUpload wp = new WarrantyUpload();
		wp.uploadWarranty(is);
	}

}
