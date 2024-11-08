import express from "express";
import mysql from "mysql2/promise"; // Importa mysql2 con promesas
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

// Crea la conexión utilizando mysql2/promise
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sigeta",
});

// Verifica la conexión
try {
  await db.connect();
  console.log("Conectado a la base de datos");
} catch (err) {
  console.error("Error conectando a la base de datos:", err);
}

// Ruta para el login
app.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;
  const query = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";

  try {
    const [results] = await db.execute(query, [usuario, contrasena]);

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
  } catch (err) {
    return res.status(500).send({ message: "Error al consultar la base de datos" });
  }
});

// Ruta para crear un nuevo usuario
app.post("/crear-usuario", async (req, res) => {
  const { nombre, apellidos, usuario, contrasena, correo, telefono, edad } = req.body;

  if (!nombre || !apellidos || !usuario || !contrasena || !correo || !telefono) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const rol = 0;
  const query = `
    INSERT INTO usuarios (nombre, apellidos, rol, usuario, contrasena, correo, estado, telefono, edad)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
  `;

  try {
    const [result] = await db.execute(query, [nombre, apellidos, rol, usuario, contrasena, correo, telefono, edad]);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "El usuario o correo ya están en uso" });
    }
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

// Ruta para obtener todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  const query = "SELECT * FROM usuarios"; 

  try {
    const [results] = await db.execute(query);
    res.status(200).json(results); 
  } catch (err) {
    return res.status(500).send({ message: "Error al obtener los usuarios", error: err });
  }
});

// Ruta para actualizar un usuario
app.put('/modificar-usuario/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, edad, telefono, correo, usuario } = req.body;
  
  try {
    const query = `
      UPDATE usuarios SET nombre = ?, apellidos = ?, edad = ?, telefono = ?, correo = ?, usuario = ? WHERE idusuario = ?
    `;
    await db.execute(query, [nombre, apellidos, edad, telefono, correo, usuario, id]);
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// Ruta para modificar el estado del usuario (inactivar/activar)
app.put('/modificar-estado/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; 

  if (![0, 1].includes(estado)) {
    return res.status(400).json({ message: "Estado inválido" });
  }

  const query = "UPDATE usuarios SET estado = ? WHERE idusuario = ?";
  
  try {
    const [result] = await db.execute(query, [estado, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Estado del usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).json({ message: "Error al actualizar el estado del usuario" });
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
