require('dotenv').config();
var mysql = require('mysql');
const nodemailer = require('nodemailer');
var rn = require('random-number');

var options = {  //random variable generation for (ex:temperature data)
min:  -1000
, max:  1000
, integer: true

}
var con = mysql.createConnection({ //database connenction
host: "localhost",
user: "root",
password: "",
database:"mydb"
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");

con.end();

});
while (temp=rn(options)){ //fetching data into database
temp++;

var sql = "INSERT INTO sensor_read (temp) VALUES ('"+temp+"')"

con.query(sql, function (err, result) {
if (err) throw err;

})};
console.log("Table created");
const log = console.log;
//log(rn);

// Step 1
let transporter = nodemailer.createTransport({ //mail trigger function
service: 'gmail',
auth: {
user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
pass: process.env.PASSWORD || '1234' // TODO: your gmail password
},
tls:{
rejectUnauthorized:false
}
});

// Step 2
let mailOptions = {
from: 'xxxxxx', //  email sender
to: 'xxxxx', //  email receiver
subject: 'sensor data- Test',
text: 'Here it is your result!!'
};

// Step 3
while (temp=rn(options)){
temp++;
if (temp==881){
console.log( temp)
transporter.sendMail(mailOptions, (err, data) => {

if (err) {
return log('Error occurs',err);
return log(data);
}
return log('Email sent!!!');
});
}
}