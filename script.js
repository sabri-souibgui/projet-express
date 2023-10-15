const express = require("express");
const app = express();
const port = 3033;

app.use(express.json()) 
const tasks = [{ name: "sam", age: 19 },{ name: "luc", age: 35 }]; 
let mysql = require("mysql2");

//Connexion à la Base de donnée
function get_connection_db() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });

  return connection;
}

// 1
app.get("/AllTasks", (request, response) => {
  let connection = get_connection_db();
  let sql = "select * from tasks";
  connection.query(sql,
    function (error, results, fields) {
      response.json(results);
    }
  );
});

// 2 
app.get("/undone_task", (request, response) => {
    let connection = get_connection_db();
    let sql = "SELECT * FROM `tasks` WHERE isDone = 0";
    connection.query(
      sql,
      function (error, results, fields) {
        response.json(results);
      }
    );
});

// 3 
app.post('/new-task', (request, response) => {
    let connection = get_connection_db();
    const { name, isDone } = request.body
    connection.query(
        'INSERT INTO `tasks`(`name`, `isDone`) VALUES (name, isDone)',         
        function (error, results, fields) {
          response.json(results);
          if (error) return res.json({ error: error });

     });
});
// 4 et 5 
app.put('/task/:id', (request, response) => {  
  let connection = get_connection_db();
  const { name, isDone } = request.body
  let id = request.params.id
  connection.query(
      'UPDATE `tasks` SET `name` = ?,  `isDone` = ? WHERE id = ?', [name, isDone, id],        
      function (error, results, fields) {        
        if (error) response.json({ error: error });
        response.json(results);
   });
});

// 6
app.delete('/task/:id', (request, response) => {
  let connection = get_connection_db();
  let id = request.params.id
  connection.query(
      'DELETE FROM `tasks` WHERE id = ?', [id],      
      function (error, results, fields) {
        console.log(results);
        if (error) response.json({ error: error });
        response.json(results);
   });
});

