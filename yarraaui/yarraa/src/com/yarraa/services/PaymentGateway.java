package com.yarraa.services;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PaymentGateway
 */
public class PaymentGateway extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaymentGateway() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
	
			String url = "https://staging.2mpayment.com/CCPG/Payment";
			
			
//			StringBuffer jb = new StringBuffer();
//			String line = null;
//			try {
//				BufferedReader reader = request.getReader();
//					while ((line = reader.readLine()) != null)
//						jb.append(line);
//				} catch (Exception e) { /*report an error*/ }
//			
//			System.out.println("jb" + jb);
			
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			
			//add reuqest header
			con.setRequestMethod("POST");			
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			con.setRequestProperty("REFERER","http://54.179.167.160:8080/yarraa");
			con.setDoOutput(true);
			
			StringBuilder sb = new StringBuilder();
			String strCurrency = request.getParameter("currency_code");
			String strTxnAmount = request.getParameter("txn_amt");
			String strDescription = request.getParameter("description");
			
			Map<String, String> hm = new HashMap<String, String>();
			hm.put("months", request.getParameter("months"));
			hm.put("plan_id", request.getParameter("plan_id"));
			hm.put("company_id", request.getParameter("company_id"));
			hm.put("customer_id", request.getParameter("customer_id"));
			hm.put("warranty_id", request.getParameter("warranty_id"));
			hm.put("currency", strCurrency);
			
			System.out.println("setting hashmap for " + request.getParameter("session_token") + ":" + hm);
			System.out.println(request.getParameter("session_token"));
			request.getServletContext().setAttribute(request.getParameter("session_token"), hm);
				
			sb.append("TXN_TYPE=SALE&CURRENCY="+strCurrency+"&COMPANY_ID=46&DESCRIPTION="+strDescription+"&TXN_AMT="+strTxnAmount+"&URLPOST=1");
			sb.append("&REMARK1="+request.getParameter("customer_id"));
			sb.append("&REMARK2="+request.getParameter("plan_id"));
			sb.append("&REMARK3="+request.getParameter("session_token"));
			
			
			
			byte[] postDataBytes = sb.toString().getBytes("UTF-8");
			con.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
		  con.getOutputStream().write(postDataBytes);
			
			
			int responseCode = con.getResponseCode();
			System.out.println("\nSending 'POST' request to URL : " + url);			
			System.out.println("Response Code : " + responseCode);
			
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer response1 = new StringBuffer();
			
			ServletOutputStream sout = response.getOutputStream();
			
			while ((inputLine = in.readLine()) != null) {
				System.out.println("inputLine : " + inputLine);
				if(inputLine.indexOf("<FRAME") > -1)
				{
					inputLine = inputLine.replace("src=\"Payment" , "src=\""+url);
				}
				response1.append(inputLine);
				sout.write(inputLine.getBytes());
			}
			in.close();
			
			sout.flush();
			sout.close();
	}

}
