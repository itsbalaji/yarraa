package com.yarraa.services;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.yarraa.dao.StatisticsDAO;
import com.yarraa.vo.StatsVO;

public class Statistics extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		StatisticsDAO dao = new StatisticsDAO();
		StatsVO vo = dao.getStats();
		
		PrintWriter pw = response.getWriter();
		response.setContentType("application/json");
		String responseJSON = "{\"user_count\":"+vo.getUserCount()+","+
				"\"brand_count\":"+vo.getBrandCount() + "," +
				"\"service_centers_count\":"+vo.getServiceCentersCount() + 
				"}";
		pw.write(responseJSON);
		
		
	}
}
