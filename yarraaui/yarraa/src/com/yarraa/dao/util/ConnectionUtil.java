package com.yarraa.dao.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ConnectionUtil {
	
	public static Connection getConnection()
	{
		InitialContext context;
		Connection con = null;
		try {
			context = new InitialContext();
			DataSource ds = (DataSource)context.lookup("java:/comp/env/jdbc/yarraaDB");
			con = ds.getConnection();
			context.close();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
			
			 Properties connectionProps = new Properties();
			    connectionProps.put("user", "YARRAA");
			    connectionProps.put("password", "Pravh291242");

			    try {
					Class.forName("oracle.jdbc.driver.OracleDriver");
					con = DriverManager.getConnection("jdbc:oracle:thin:@52.76.35.51:1521:YARRAA", connectionProps);
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
		        
		}
		return con;
	}
	
	public static void closeConnection(Connection con)
	{
		if(con!=null)
		{
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
