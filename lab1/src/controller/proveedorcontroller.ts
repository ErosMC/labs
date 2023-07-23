import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proveedor } from "../entity/Proveedor";
import { validate } from "class-validator";

class proveedorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const ProveedorRepo = AppDataSource.getRepository(Proveedor);

      const listaProveedor = await ProveedorRepo.find({});

      if (listaProveedor.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaProveedor);
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

      const ProveedorRepo = AppDataSource.getRepository(Proveedor);

      let proveedor;
      try {
        proveedor = await ProveedorRepo.findOneOrFail({
          where: { Codigo_proveedor: id },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(proveedor);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { Codigo_proveedor, Nombres_Proveedor, Apellidos_Proveedor, Provincia_Proveedor, Direccion_Proveedor,Telefono_Proveedor } = req.body;

      //validacion de datos de entrada
      if (!Codigo_proveedor) {
        return resp.status(404).json({ mensaje: "Debe indicar el codigo del proveedor" });
      }
      if (!Nombres_Proveedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre del proveedor" });
      }
      if (!Apellidos_Proveedor) {
        return resp.status(404).json({ mensaje: "Debe indicar los apellidos del proveedor" });
      }
      if (!Direccion_Proveedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la direccion del proveedor" });
      }
      if (!Provincia_Proveedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la provincia del proveedor" });
      }
      if (!Telefono_Proveedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el telefono del proveedor" });
      }

      //validacion de reglas de negocio
      const ProveedorRepo = AppDataSource.getRepository(Proveedor);
      const pro = await ProveedorRepo.findOne({ where: { Codigo_proveedor } });

      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "El proovedor ya existe en la base datos." });
      }

      const fecha = new Date();

      let proveedor = new Proveedor();
      proveedor.Codigo_proveedor = Codigo_proveedor;
      proveedor.Nombres_Proveedor = Nombres_Proveedor;
      proveedor.Apellidos_Proveedor = Apellidos_Proveedor;
      proveedor.Direccion_Proveedor = Direccion_Proveedor;
      proveedor.Provincia_Proveedor = Provincia_Proveedor;
      proveedor.Telefono_Proveedor = Telefono_Proveedor;

      //validar con class validator
      const errors = await validate(proveedor, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await ProveedorRepo.save(proveedor);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { Codigo_proveedor, Nombres_Proveedor, Apellidos_Proveedor, Provincia_Proveedor, Direccion_Proveedor,Telefono_Proveedor } = req.body;

    //validacion de datos de entrada
    if (!Codigo_proveedor) {
      return resp.status(404).json({ mensaje: "Debe indicar el codigo del proveedor" });
    }
    if (!Nombres_Proveedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del proveedor" });
    }
    if (!Apellidos_Proveedor) {
      return resp.status(404).json({ mensaje: "Debe indicar los apellidos del proveedor" });
    }
    if (!Direccion_Proveedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la direccion del proveedor" });
    }
    if (!Provincia_Proveedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la provincia del proveedor" });
    }
    if (!Telefono_Proveedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el telefono del proveedor" });
    }

    //validacion de reglas de negocio
    const ProveedorRepo = AppDataSource.getRepository(Proveedor);
    let pro: Proveedor;
    try {
      pro = await ProveedorRepo.findOneOrFail({ where: { Codigo_proveedor } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    pro.Nombres_Proveedor = Nombres_Proveedor;
    pro.Apellidos_Proveedor = Apellidos_Proveedor;
    pro.Direccion_Proveedor = Direccion_Proveedor;
    pro.Provincia_Proveedor = Provincia_Proveedor;
    pro.Telefono_Proveedor = Telefono_Proveedor;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(pro, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await ProveedorRepo.save(pro);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };
}

export default proveedorController;
