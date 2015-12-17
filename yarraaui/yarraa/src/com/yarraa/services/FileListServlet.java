package com.yarraa.services;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileListServlet extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String fileType = request.getPathInfo();
		
		
		List<String> lst = new ArrayList<String>();
		File folder = new File(getServletContext().getRealPath("img/"+fileType));
		File[] listOfFiles = folder.listFiles();

		    for (int i = 0; i < listOfFiles.length; i++) {
		      if (listOfFiles[i].isFile()) {
		    	  lst.add("\""+listOfFiles[i].getName()+"\"");
		      } else if (listOfFiles[i].isDirectory()) {
		        //System.out.println("Directory " + listOfFiles[i].getName());
		      }
		    }
		    
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		String responseJSON = "{\""+fileType.substring(1)+"\":"+ lst.toString() + "}";
		pw.write(responseJSON);
		
	}
}
