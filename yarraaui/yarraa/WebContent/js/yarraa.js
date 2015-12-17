function logout(){
		
		localStorage.removeItem('yarraaUser');
		location.href='/yarraa/index.html';
	};