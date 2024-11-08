import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());


app.use(session({
  secret: '*k5:aSTKJ2B]ky?RcCS0p}!M0N!et0', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "root",
database: "sigeta",
});

db.connect((err) => {
if (err) {
  console.error("Error conectando a la base de datos:", err);
} else {
  console.log("Conectado a la base de datos");
}
});

// Ruta para el login
app.post("/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  const query = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";

  db.query(query, [usuario, contrasena], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Error al consultar la base de datos" });
    }

    if (results.length > 0) {
      const { rol, estado } = results[0];
      
      if (estado === 0) {
        return res.status(403).send({
          message: "Tu cuenta está inactiva. Contacta al administrador.",
        });
      }

      req.session.rol = rol;  
      return res.status(200).send({ message: "Inicio de sesión exitoso", rol });
    } else {
      return res.status(401).send({
        message: "Usuario o contraseña incorrectos",
      });
    }
  });
});

// Ruta para crear un nuevo usuario
app.post("/crear-usuario", (req, res) => {
  const { nombre, apellidos, usuario, contrasena, correo, telefono, edad } = req.body;

  if (!nombre || !apellidos || !usuario || !contrasena || !correo || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const rol = 0;

  const query = `
    INSERT INTO usuarios (nombre, apellidos, rol, usuario, contrasena, correo, estado, telefono, edad)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
  `;

  db.query(query, [nombre, apellidos, rol, usuario, contrasena, correo, telefono, edad], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: "El usuario o correo ya están en uso" });
      }
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
    res.status(201).json({ message: "Usuario creado exitosamente" });
  });
});

// Ruta para obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios"; 

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Error al obtener los usuarios", error: err });
    }
    res.status(200).json(results); 
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});