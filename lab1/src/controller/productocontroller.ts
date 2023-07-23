import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";
import { validate } from "class-validator";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);

      const listaProductos = await productosRepo.find({});

      if (listaProductos.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);

      let producto;
      try {
        producto = await productosRepo.findOneOrFail({
          where: {Codigo_producto: id},
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(producto);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { Codigo_producto, Nombre, Precio_producto, Stock_maximo_producto, Stock_minimo_producto, Codigo_proveedor } = req.body;

      //validacion de datos de entrada
      if (!Codigo_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar el Codigo_producto" });
      }
      if (!Nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre del producto" });
      }
      if (!Precio_producto) {
        return resp.status(404).json({ mensaje: "Debe indicar el precio" });
      }
      if (Precio_producto < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar un precio mayor que 0" });
      }
      if (!Stock_maximo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el stock del producto" });
      }
      if (Stock_maximo_producto < 0) {
        return resp
          .status(404)
          .json({ mensaje: "El stock debe ser mayor que ser" });
      }

      if (!Stock_minimo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el stock del producto" });
      }
      if (Stock_minimo_producto < 0) {
        return resp
          .status(404)
          .json({ mensaje: "El stock debe ser mayor que ser" });
      }

      if (!Codigo_proveedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el codigo del proveedor del producto" });
      }

      //validacion de reglas de negocio
      const productosRepo = AppDataSource.getRepository(Producto);
      const pro = await productosRepo.findOne({ where: { Codigo_producto } });

      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "El producto ya existe en la base datos." });
      }


      let producto = new Producto();
      producto.Codigo_producto = Codigo_producto;
      producto.Nombre = Nombre;
      producto.Stock_maximo_producto = Stock_maximo_producto;
      producto.Stock_minimo_producto = Stock_minimo_producto;
      producto.Precio_producto = Precio_producto;
      producto.Codigo_proveedor = Codigo_proveedor;
      
      //validar con class validator
      const errors = await validate(producto, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await productosRepo.save(producto);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { Codigo_producto, Nombre, Precio_producto, Stock_maximo_producto, Stock_minimo_producto, Codigo_proveedor } = req.body;

    //validacion de datos de entrada
    if (!Codigo_producto) {
      return resp.status(404).json({ mensaje: "Debe indicar el Codigo_producto" });
    }
    if (!Nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }
    if (!Precio_producto) {
      return resp.status(404).json({ mensaje: "Debe indicar el precio" });
    }
    if (Precio_producto < 0) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar un precio mayor que 0" });
    }
    if (!Stock_maximo_producto) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el stock del producto" });
    }
    if (Stock_maximo_producto < 0) {
      return resp
        .status(404)
        .json({ mensaje: "El stock debe ser mayor que ser" });
    }

    if (!Stock_minimo_producto) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el stock del producto" });
    }
    if (Stock_minimo_producto < 0) {
      return resp
        .status(404)
        .json({ mensaje: "El stock debe ser mayor que ser" });
    }

    if (!Codigo_proveedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el codigo del proveedor del producto" });
    }

    //validacion de reglas de negocio
    const productosRepo = AppDataSource.getRepository(Producto);
    let pro: Producto;
    try {
      pro = await productosRepo.findOneOrFail({ where: { Codigo_producto } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    pro.Nombre = Nombre;
    pro.Stock_maximo_producto = Stock_maximo_producto;
    pro.Stock_minimo_producto = Stock_minimo_producto;
    pro.Precio_producto = Precio_producto;
    pro.Codigo_proveedor = Codigo_proveedor;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(pro, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await productosRepo.save(pro);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };
}

export default ProductosController;
