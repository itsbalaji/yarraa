package proxy;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class ProxyFilter implements Filter {

    public ProxyFilter() {
    }

    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
                     HttpServletRequest req = (HttpServletRequest)request;
                     // Store request path to HTTP Request object
         String uri = req.getRequestURI().substring(req.getContextPath().length());
       
         if(uri.startsWith("/api"))
         {
        	
        	 request.setAttribute("uri", uri);
             // Forward filtered requests to MyProxy servlet

        	 request.getRequestDispatcher("/ProxyServlet").forward(request, response);       
         }
         else
        	 {
        	 chain.doFilter(request, response);
        	 }
    }

    public void init(FilterConfig fConfig) throws ServletException {
    }

}