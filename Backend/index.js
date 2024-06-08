const express = require("express");
const materialRouter = require("./Routes/material");
const usuarioRouter = require("./Routes/usuario");
const categoriaRouter = require("./Routes/categoria");
const productoRouter = require("./Routes/producto");
const tipoUsuarioRouter = require("./Routes/tipo_usuario");
const clienteRouter = require("./Routes/cliente");
const facturaRouter = require("./Routes/factura");
const detallefacturaRouter = require("./Routes/detallefactura");
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/material",materialRouter);
app.use("/usuario",usuarioRouter);
app.use("/categoria",categoriaRouter);
app.use("/producto",productoRouter);
app.use("/tipo_usuario",tipoUsuarioRouter);
app.use("/cliente",clienteRouter);
app.use("/factura",facturaRouter);
app.use("/detallefactura",detallefacturaRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
