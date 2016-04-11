var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var client = mysql.createConnection({
	user: 'root',
	password: 'help*2*2',
	database: 'ksram'
});

var app = express();
var server = http.createServer(app);
// 고정 경로 추가

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ exteneded: false}));


server.listen(52273, function() {
	console.log('server running at http ');
});

//메인 페이지
app.get('/', function (request, response) {
	fs.readFile('index.html','utf8', function(error, data) {
		client.query('SELECT * FROM os_query', function(error, results) {
		response.send(ejs.render(data, {
		data:results
		}));
	});
   });

});

// getType query JSON
app.get('/mtype/:id', function (request, response) {
		client.query('SELECT * FROM master where 폐기=0 and ID =  ?',[request.params.id], function(error, results) {
				response.send(results);
		});
  		
   });

//os_list query JSON
app.get('/os_list', function (request, response) {
		client.query('SELECT * FROM os_query where 폐기=0', function(error, results) {
				response.send(results);
		});
  		
   });
   
// server 리스트 query JSON
app.get('/server_list', function (request, response) {
		client.query('SELECT * FROM server_query where 폐기=0', function(error, results) {
				response.send(results);
		});
   });

// DISK 리스트 query JSON
app.get('/disk_list', function (request, response) {
		client.query('SELECT * FROM disk_query where 폐기=0 and 분류 = "디스크"', function(error, results) {
					response.send(results);
				
		});
   });

// NETWORK 리스트 query JSON
app.get('/network_list', function (request, response) {
		client.query('SELECT * FROM network_query where 폐기=0', function(error, results) {
					response.send(results);
				
		});
   });

// SAN 스위치 리스트 query JSON
app.get('/san_list', function (request, response) {
		client.query('SELECT * FROM san_query where 폐기=0', function(error, results) {
					response.send(results);
				
		});
   });
  
 // S/W 스위치 리스트 query JSON
app.get('/sw_list', function (request, response) {
		client.query('SELECT * FROM sw_query where 폐기=0', function(error, results) {
					response.send(results);
				
		});
   });

 // IP 스위치 리스트 query JSON
app.get('/ip_list', function (request, response) {
			client.query('SELECT * FROM ip_query', function(error, results) { 
				response.send(results);					
		});
				
   });

// 백업/TAPE 리스트 query JSON
app.get('/tape_list', function (request, response) {
		client.query('SELECT * FROM disk_query where 폐기=0 and 분류 = "테이프"', function(error, results) {
					response.send(results);
				
		});
   });



   
//

// OS리스트에서 OS선택시
app.get('/os_list/:id', function (request, response) {
		
	if(request.param('type') == 'os') {
		client.query('SELECT * FROM os_query where 폐기=0 and os_query.id=' + request.params.id, function(error, results) {
				response.send(results);					
							
		});
	}
	else if(request.param('type') == 'server')
	{
	//  H/W 서버
  		client.query('SELECT * FROM link_view where P_ID=' + request.params.id + ' and 분류= "서버"  ', function(error, results) {
					response.send(results);
		});
  	}// H/W 서버 끝
  	
  	else if(request.param('type')=='ip')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "IP"  ', function(error, results) {
					response.send(results);
  		});
  	} // IP 끝	
  	else if(request.param('type')=='sw')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "SW"  ', function(error, results) {
					response.send(results);
  		});
  	} // IP 끝
  	
 });  //os리스트 선택 끝


// 서버리스트에서 서버선택시
app.get('/server_list/:id', function (request, response) {
		
	if(request.param('type') == 'server') {
		client.query('SELECT * FROM server_query where 폐기=0 and server_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	//  서버 - 자산현황 시작
  		client.query('SELECT * FROM server_asset_query where 폐기=0 and server_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// 서버 - 자산현황 끝
  	
  	//서버 - 디스크 시작
  	else if(request.param('type')=='disk')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "디스크"  ', function(error, results) {
					response.send(results);
  		});
  	} // 서버 - 디스크 끝	
  	// 서버 - IP 시작
  	else if(request.param('type')=='ip')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "IP"  ', function(error, results) {
					response.send(results);
  		});
  	}  //서버 - IP끝
  	
  	 //서버 -  네트워크스위치 시작	
  	 else if(request.param('type')=='network')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "NETWORK"  ', function(error, results) {
					response.send(results);
  		});
  	} // 서버 - 네트워크스위치 끝
  	 
  	   	// 서버 - OS 시작
  	else if(request.param('type')=='os')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "OS"  ', function(error, results) {
					response.send(results);
  		});
  	}  //서버 - OS 끝
  	
  	//서버 -  네트워크스위치 시작
 else if(request.param('type')=='san')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "SAN"  ', function(error, results) {
					response.send(results);
  		});
  	} // 서버 - 네트워크스위치 끝 	 
  	 
  	//서버 - 
  	else if(request.param('type')=='sw')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "SW"  ', function(error, results) {
					response.send(results);
  		});
  	} // IP 끝
  	
 });  //서버리스트 선택 끝
 
 
 app.post('/os_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),ACCOUNT:request.param('itemAccount'),OS_NAME:request.param('osType'),CPU:request.param('osCpu'),RAM:request.param('osRam') ,HDD:request.param('osHdd'), 가상화여부: 0, 가상화가능:0 };
	 	client.query('INSERT INTO OS SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/os_list/'+colID);
		});
	});
 
 }); //OS_LIST POST명령 끝
 
 
 app.post('/server_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),HW_NAME:request.param('hwType'),HW_VENDER:request.param('hwVender'),HW_LEVEL:request.param('hwLevel')
    ,CPU:request.param('hwCpu') ,RAM:request.param('hwRam'), HDD:request.param('hwHdd'),설치위치:request.param('location'), 기타:request.param('etc') };
	 	client.query('INSERT INTO SERVER SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/server_list/'+colID);
		});
	});
 
 }); //SERVER_LIST POST명령 끝
 //
 //
 //
 //DISK_LIST POST 명령 시작
  app.post('/disk_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),HW_NAME:request.param('hwType'),HW_VENDER:request.param('hwVender'),HW_LEVEL:request.param('hwLevel')
    ,전체공간:request.param('totalSpace') ,가용공간:request.param('freeSpace'), 설치위치:request.param('location'), 기타:request.param('etc'),상세구성:request.param('itemDetail') };
	 	client.query('INSERT INTO storage SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/disk_list/'+colID);
		});
	});
 
 }); //DISK_LIST POST명령 끝
 
 //NETWORK_LIST POST명령 시작
 app.post('/network_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),ACCOUNT:request.param('itemAccount'),HW_NAME:request.param('hwType'),HW_VENDER:request.param('hwVender'),ACCOUNT:request.param('itemAccount')
    	,PORT:request.param('port') ,설치위치:request.param('location'), 기타: request.param('etc')};
	 	client.query('INSERT INTO SWITCH SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback
        			(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/network_list/'+colID);
		});
	});
 
 }); //NETWORK_LIST POST명령 끝
 
 //SAN_LIST POST명령 시작
 app.post('/san_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),ACCOUNT:request.param('itemAccount'),HW_NAME:request.param('hwType'),HW_VENDER:request.param('hwVender')
    	,PORT:request.param('port') ,설치위치:request.param('location'), 기타: request.param('etc')};
	 	client.query('INSERT INTO SWITCH SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/san_list/'+colID);
		});
	});
 
 }); //SAN_LIST POST명령 끝
 
 //SW_LIST POST명령 시작
 app.post('/sw_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),SW_VENDER:request.param('swVender'),SW_LICENSE:request.param('swLicense')};
	 	client.query('INSERT INTO SW SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/sw_list/'+colID);
		});
	});
 
 }); //SW_LIST POST명령 끝
 
  //IP_LIST POST명령 시작
 app.post('/ip_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}
	    	client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
	   /* 			추후를 위해 남겨놈
   // var post = {ID: colID, 업무:request.param('job'),SW_VENDER:request.param('swVender'),SW_LICENSE:request.param('swLicense')};
	// 	client.query('INSERT INTO SW SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
	*/		
		response.redirect('/#/ip_list/'+colID);
		});
	});
 
 }); //IP_LIST POST명령 끝
 

//TAPE_LIST POST 명령 시작
  app.post('/tape_list/', function (request, response) {
  	var colID;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('INSERT INTO MASTER (분류,이름,상세내용,폐기)  VALUES (?, ?,?,0)',[ request.param('type'), request.param('itemName'),request.param('itemContents')],function(error, results){
	 		colID = results.insertId;
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}		
    var post = {ID: colID, 업무:request.param('job'),HW_NAME:request.param('hwType'),HW_VENDER:request.param('hwVender'),HW_LEVEL:request.param('hwLevel'),ACCOUNT:request.param('itemAccount')
    ,전체공간:request.param('totalSpace') ,가용공간:request.param('freeSpace'), 설치위치:request.param('location'), 기타:request.param('etc'),상세구성:request.param('itemDetail') };
	 	client.query('INSERT INTO storage SET ?',post, function(error, results){
	 		      if (err) { 
        			client.rollback(function() {
        		  throw err;
       				 });
    			  }
	 			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
			});
		response.redirect('/#/tape_list/'+colID);
		});
	});
 
 }); //TAPE_LIST POST명령 끝 
 
 
 
 // DISK 디스크
 app.get('/disk_list/:id', function (request, response) {
		
	if(request.param('type') == 'disk') {
		client.query('SELECT * FROM disk_query where 폐기=0 and disk_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	//  디스크 - 자산현황 시작
  		client.query('SELECT * FROM disk_asset_query where 폐기=0 and disk_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// 디스크 - 자산현황 끝
  		
  	 //디스크 -  네트워크스위치 시작	
  	 else if(request.param('type')=='network')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "NETWORK"  ', function(error, results) {
					response.send(results);
  		});
  	} // 디스크 - 네트워크스위치 끝
  	 

  	//디스크 -  SAN 스위치 시작
 else if(request.param('type')=='san')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "SAN"  ', function(error, results) {
					response.send(results);
  		});
  	} // 디스크 - SAN 스위치 끝 	 
  
    	   	// 디스크 - OS 시작
  	else if(request.param('type')=='os')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "OS"  ', function(error, results) {
					response.send(results);
  		});
  	}  //디스크 - OS 끝
  	
  	
 });  //디스크 선택 끝
 
  // NETWORK
 app.get('/network_list/:id', function (request, response) {
		
	if(request.param('type') == 'network') {
		client.query('SELECT * FROM network_query where 폐기=0 and network_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	//  네트워크 - 자산현황 시작
  		client.query('SELECT * FROM network_asset_query where 폐기=0 and network_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// 네트워크 - 자산현황 끝
  		
  	 //네트워크 -  port 시작	
  	 else if(request.param('type')=='port')
  	{
  		client.query('SELECT * FROM link_view where P_ID=' + request.params.id + ' and LINK_TYPE= "NETWORK"  ', function(error, results) {

					response.send(results);
  		});
  	} // 네트워크 - PORT 끝
  	 
 });  //네트워크 선택 끝
 
  // SAN 스위치
 app.get('/san_list/:id', function (request, response) {
		
	if(request.param('type') == 'san') {
				client.query('SELECT * FROM san_query where 폐기=0 and san_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	// SAN - 자산현황 시작
  		client.query('SELECT * FROM network_asset_query where 폐기=0 and network_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// SAN - 자산현황 끝
  		
  	 //SAN -  port 시작	
  	 else if(request.param('type')=='port')
  	{
  		client.query('SELECT * FROM link_view where P_ID=' + request.params.id + ' and LINK_TYPE= "SAN"  ', function(error, results) {
					response.send(results);
  		});
  	} // SAN - PORT 끝
  	 
 });  //SAN선택 끝
 
   // SW 스위치
 app.get('/sw_list/:id', function (request, response) {
		
	if(request.param('type') == 'sw') {
				client.query('SELECT * FROM sw_query where 폐기=0 and sw_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	// SW - 자산현황 시작
  		client.query('SELECT * FROM sw_asset_query where 폐기=0 and sw_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// SW - 자산현황 끝
  		
  	 //SW -  port 시작	
  	 else if(request.param('type')=='os')
  	{
  		client.query('SELECT * FROM link_view where P_ID=' + request.params.id + ' and LINK_TYPE= "SW"  ', function(error, results) {
					response.send(results);
  		});
  	} // SW - PORT 끝
  	 
 });  //SW선택 끝

  // IP 시작
 app.get('/ip_list/:id', function (request, response) {
		
		//쿼리 select A.ID, A.이름, A.상세내용, link_view.C_ID, link_view.분류, link_view.이름 as NEW이름 FROM (select * from master where 분류="IP") as A LEFT OUTER JOIN link_view ON A.ID=link_view.P_ID
	if(request.param('type') == 'ip') {
				client.query('select  * from ip_query WHERE ID=' + request.params.id, function(error, results) { 
				response.send(results);		
							
		});
	}
  	 //IP 연결된 장비 시작	
  	 else if(request.param('type')=='connectingip')
  	{
  		client.query('SELECT * FROM link_view where P_ID=' + request.params.id + ' and LINK_TYPE= "IP"  ', function(error, results) {
					response.send(results);
  		});
  	} // IP 연결된 장비 끝
  	 
 });  //IP선택 끝

 // TAPE 
 app.get('/tape_list/:id', function (request, response) {
		
	if(request.param('type') == 'tape') {
		client.query('SELECT * FROM disk_query where 폐기=0 and disk_query.ID=' + request.params.id, function(error, results) {
				response.send(results);					
		});
	}
	else if(request.param('type') == 'asset')
	{
	//  TAPE - 자산현황 시작
  		client.query('SELECT * FROM disk_asset_query where 폐기=0 and disk_asset_query.ID=' + request.params.id, function(error, results) {
					response.send(results);
		});
  	}// TAPE - 자산현황 끝
  		
  	 //TAPE -  네트워크스위치 시작	
  	 else if(request.param('type')=='network')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "NETWORK"  ', function(error, results) {
					response.send(results);
  		});
  	} // TAPE - 네트워크스위치 끝
  	 

  	//TAPE -  SAN 스위치 시작
 else if(request.param('type')=='san')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "SAN"  ', function(error, results) {
					response.send(results);
  		});
  	} // TAPE - SAN 스위치 끝 	 
  
    	   	// TAPE - OS 시작
  	else if(request.param('type')=='os')
  	{
  		client.query('SELECT * FROM link_view where C_ID=' + request.params.id + ' and LINK_TYPE= "OS"  ', function(error, results) {
					response.send(results);
  		});
  	}  //TAPE - OS 끝
  	
  	
 });  //TAPE 선택 끝
 
 app.get('/type', function (request, response) {
		client.query('SELECT * FROM type',function(error, results) {
			response.send(results);	
		});
		
});

app.get('/job', function (request, response) {
		client.query('SELECT * FROM job',function(error, results) {
			response.send(results);	
		});
		
});


// 연결SUBMIT 처리

//연결 POST명령 시작
 app.post('/connect/:id', function (request, response) {
  	var ctype;
  	var ptype = request.param('secondType');
  	var location;
 	client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('SELECT 분류 from master where ID=' +request.param('id'), function(error, results){
	 				ctype = results[0].분류;
	 				
				if (err) { 
		      client.rollback(function() {
		        throw err;
		      		});
		    	}
			if(ctype=="OS"){
				location="/#/os_list/"+request.param('id');
				if(ptype=="서버") {
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ ctype,request.param('id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('p_id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
						
				} else if((ptype=="IP") || (ptype=="SW")) {
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ request.param('secondType'),request.param('p_id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
				}
			} //OS 끝
			else if(ctype=="서버"){
					location="/#/server_list/"+request.param('id');
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ request.param('secondType'),request.param('p_id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
				
				} //서버 끝
	    	else if(ctype=="디스크"){
	    		location="/#/disk_list/"+request.param('id');
				if(ptype=="서버") {
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ ctype,request.param('id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('p_id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
						
				} else if((ptype=="NETWORK") || (ptype=="SAN") || (ptype=="OS")) {
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ request.param('secondType'),request.param('p_id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
				}
			} //디스크 끝
	    	else if((ctype=="NETWORK") || (ctype=="SAN") || (ctype=="SW") || (ctype=="IP")){
	    			if(ctype=="NETWORK"){
	    				location="/#/network_list/"+request.param('id');
	    			} else if(ctype=="SAN") {
	    				location="/#/san_list/"+request.param('id');
	    			} else if(ctype=="SW") {
	    				location="/#/sw_list/"+request.param('id');
	    			} else if(ctype=="IP") {
	    				location="/#/ip_list/"+request.param('id');
	    			}
	    			
					client.query('INSERT INTO LINK (LINK_TYPE, P_ID, P_ARG1, P_ARG2, C_ID)  VALUES (?, ?,?,?,?)',[ ctype,request.param('id'),request.param('detail1'), 
 		 			request.param('detail2'),request.param('p_id')],function(error, results){
	    			client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
				      	});//commit 끝
					}); // Insert 쿼리 끝	
				
				} //NETWORK, SAN, SW, IP끝
			console.log(location);
 			response.send(location);
		});	//select 쿼리 끝
	});	//query 명령어 끝
		
 		
 }); // 연결 POST명령 끝
 
app.post('/discard/:id', function (request, response) {
  client.beginTransaction(function (err) {
	 	 if (err) { throw err; }
 		 client.query('UPDATE MASTER SET ?  where ID='+request.param('id'),{폐기: 1, 폐기정보: request.param('discardInfo') } ,function(error, results){
			if (err) { 
	      client.rollback(function() {
	        throw err;
	      		});
	    	}
	    	client.commit(function(err) {
		        		if (err) { 
		        		  client.rollback(function() {
		         		   throw err;
		       				   });
		     			   }
		      				  
	 			});
 			});
 	});
 }); // 폐기 실행

