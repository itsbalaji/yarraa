package com.yarraa.services;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PaymentSuccess
 */
public class PaymentSuccess extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaymentSuccess() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Getting Payment Success: GET");
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Getting Payment Success: POST");
		Enumeration<String> params = request.getParameterNames();
		
		postWarrantyPurchase(request);
		
		
	}
	
	
	private void postWarrantyPurchase(HttpServletRequest request) throws IOException
	{
		
		String yarraaURL = "http://54.179.167.160:8080/Yarraa";
		
		
		
				
		
		
		System.out.println(request.getParameter("REMARK3"));
		Map<String, String> hm = (HashMap<String, String>) request.getServletContext().getAttribute(request.getParameter("REMARK3"));
		System.out.println(hm);
		
		String url = yarraaURL + "/warranties/"+hm.get("warranty_id")+"/ext-warranty/"+hm.get("company_id")+"/purchase";	
		
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		
		//add reuqest header
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
		con.setRequestProperty("Content-Type", "application/json");
		
		con.setRequestProperty("Authorization",request.getParameter("REMARK3"));
		
		boolean errorStatus = false;
		
		if(request.getParameter("TXN_MESSAGE") != null && !"null".equalsIgnoreCase(request.getParameter("TXN_MESSAGE")) )
		{
			errorStatus = true;
		}
		
		String status = request.getParameter("STATUS");
		status = URLEncoder.encode(status, "UTF-8");
		status = status.replace("/\r\n|\n/g", " ");
		
		StringBuilder sb = new StringBuilder();
		sb.append("{");
		sb.append("\"months\":\""+hm.get("months")+"\",");
		sb.append("\"plan_id\":\""+hm.get("plan_id")+"\",");
		sb.append("\"status_message\":\""+status+"\",");
		sb.append("\"prd_desc\":\""+request.getParameter("DESCRIPTION")+"\",");
		sb.append("\"currency_code\":\""+hm.get("currency")+"\",");
		sb.append("\"txn_amt\":\""+request.getParameter("TXN_AMT")+"\",");
		sb.append("\"merchant_ref\":\""+request.getParameter("MERCH_REF")+"\",");
		sb.append("\"txn_amt_deducted\":\""+request.getParameter("TXN_AMT_DEDUCTED")+"\",");
		sb.append("\"txn_id\":\""+request.getParameter("TXN_ID")+"\",");
		sb.append("\"auth_id\":\""+request.getParameter("AUTH_ID")+"\",");
		sb.append("\"error\":\""+errorStatus+"\"");
		sb.append("}");
		
		System.out.println("Request JSON : "+ sb);
		// Send post request
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		
	
		if(sb != null)
		{
			System.out.println(sb.toString());
			wr.writeBytes(sb.toString());
			wr.flush();
		}
		wr.close();
		
		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + sb);
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
		
		System.out.println(response1);
	}
	
	

}
