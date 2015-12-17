package proxy;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProxyServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final String USER_AGENT = "Mozilla/5.0";   
    private final String yarraaURL = "http://54.179.167.160:8080/Yarraa";
    public ProxyServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                                //  Create Get request dynamically to remote server
    	
    	String restUrl = request.getAttribute("uri").toString().substring(4);
        //  Create Post request dynamically to remote server

		System.out.println("restUrl = " + restUrl);
		String url = yarraaURL+restUrl;
		
		if(request.getQueryString() != null )
		{
			url = url+"?"+request.getQueryString();
		}

        
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
        // optional default is GET
        con.setRequestMethod("GET");
 
        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);
        
        setHeaders(con, request);
 
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);
 
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response1 = new StringBuffer();
 
        ServletOutputStream sout = response.getOutputStream();
        
        while ((inputLine = in.readLine()) != null) {
            response1.append(inputLine);
            sout.write(inputLine.getBytes());
        }
        in.close();
 
        sout.flush();
 
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	
    	String restUrl = request.getAttribute("uri").toString().substring(4);
                                //  Create Post request dynamically to remote server
    	
    	System.out.println("restUrl = " + restUrl);
        String url = yarraaURL+restUrl;
        
        
        StringBuffer jb = new StringBuffer();
        String line = null;
        try {
          BufferedReader reader = request.getReader();
          while ((line = reader.readLine()) != null)
            jb.append(line);
        } catch (Exception e) { /*report an error*/ }

        
        
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 
        //add reuqest header
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", USER_AGENT);
        con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
        con.setRequestProperty("Content-Type", "application/json");
        
        setHeaders(con, request);
 
        StringBuilder sb = new StringBuilder();
          /*for(Entry<String, String[]> e : request.getParameterMap().entrySet()){
              if(sb.length() > 0){
                  sb.append('&');
              }
              String[] temp =e.getValue();
              for(String s:temp) {
                  sb.append(URLEncoder.encode(e.getKey(), "UTF-8")).append('=').append(URLEncoder.encode(s, "UTF-8"));  
              }
          }*/
        Set<String> set = request.getParameterMap().keySet();
        
        for(String e : set){
            if(sb.length() > 0){
                sb.append('&');
            }
            String[] temp = request.getParameterValues(e);
            for(String s:temp) {
                sb.append(URLEncoder.encode(e, "UTF-8")).append('=').append(URLEncoder.encode(s, "UTF-8"));  
            }
        }
        
        String urlParameters = sb.toString();
 
        
        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
       
        if(urlParameters != null && !urlParameters.equals("null") && urlParameters.length() > 0 )
        {	wr.writeBytes(urlParameters);
        	
        	wr.flush();
        }
        if(jb != null)
        {
        	System.out.println(jb.toString());
        	wr.writeBytes(jb.toString());
        	wr.flush();
        }
        wr.close();
 
        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post parameters : " + urlParameters);
        System.out.println("Response Code : " + responseCode);
 
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response1 = new StringBuffer();
 
        ServletOutputStream sout = response.getOutputStream();
        
        while ((inputLine = in.readLine()) != null) {
            response1.append(inputLine);
            sout.write(inputLine.getBytes());
        }
        in.close();
 
        sout.flush();
    }
    
    
    
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //  Create Get request dynamically to remote server

			String restUrl = request.getAttribute("uri").toString().substring(4);
			//  Create Post request dynamically to remote server
			
			System.out.println("restUrl = " + restUrl);
			String url = yarraaURL+restUrl;
			
			if(request.getQueryString() != null )
			{
			url = url+"?"+request.getQueryString();
			}
			
			
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			
			// optional default is GET
			con.setRequestMethod("DELETE");
			
			//add request header
			con.setRequestProperty("User-Agent", USER_AGENT);
			
			setHeaders(con, request);
			
			
			
			int responseCode = con.getResponseCode();
			System.out.println("\nSending 'DELETE' request to URL : " + url);
			System.out.println("Response Code : " + responseCode);
			
			BufferedReader in = new BufferedReader(
			new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer response1 = new StringBuffer();
			
			ServletOutputStream sout = response.getOutputStream();
			
			while ((inputLine = in.readLine()) != null) {
			response1.append(inputLine);
			sout.write(inputLine.getBytes());
			}
			in.close();
			
			sout.flush();
			
	}

	private void setHeaders(HttpURLConnection con, HttpServletRequest request) {
		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String key = (String) headerNames.nextElement();
			String value = request.getHeader(key);
			con.setRequestProperty(key,value);
		}
		
	}

}