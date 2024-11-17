const mysql = require("mysql")

const conexao = mysql.createConnection({
    host:"gcte.c32gek62eawj.us-east-1.rds.amazonaws.com",
    port: 3306,
    user:"admin",
    password:"21012000kaio",
    database:"gcte"

})

module.exports = conexao