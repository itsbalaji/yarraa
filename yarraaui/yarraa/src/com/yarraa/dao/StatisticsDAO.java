package com.yarraa.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.yarraa.dao.util.ConnectionUtil;
import com.yarraa.vo.StatsVO;

public class StatisticsDAO {
	
	public StatsVO getStats()
	{
		StatsVO vo = new StatsVO();
		
		Connection con = ConnectionUtil.getConnection();
		
		
		try {
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery("select count(1) from RST_USERS");
			if(rs.next())
			{
				vo.setUserCount(rs.getInt(1));
			}
			rs.close();
			st.close();
			
			
			st = con.createStatement();
			rs = st.executeQuery("select count(1) from RST_BRANDS");
			if(rs.next())
			{
				vo.setBrandCount(rs.getInt(1));
			}
			rs.close();
			st.close();
			
			st = con.createStatement();
			rs = st.executeQuery("select count(1) from RST_COMPANY WHERE COMPANY_TYPE = 'Service Centers'");
			if(rs.next())
			{
				vo.setServiceCentersCount(rs.getInt(1));
			}
			rs.close();
			st.close();
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			ConnectionUtil.closeConnection(con);
		}
		
		return vo;
		
	}

}
