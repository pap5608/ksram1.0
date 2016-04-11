var ADODB = require('node-adodb'),
  connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=SRAM.accdb;');
 
//  
ADODB.debug = true;
//  
ADODB.encoding = 'gbk';
 
//  
 
connection
  .query('SELECT * FROM OS_QUERY')
  .on('done', function (data){
    console.log('Result:'.green.bold, JSON.stringify(data, null, '  ').bold);
  })
  .on('fail', function (data){
    // TODO 
  });