import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vendedor } from "../entity/Vendedor";
import { validate } from "class-validator";

class VendedorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const VendedorRepo = AppDataSource.getRepository(Vendedor);

      const listaVendedor = await VendedorRepo.find({});

      if (listaVendedor.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaVendedor);
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

      const VendedorRepo = AppDataSource.getRepository(Vendedor);

      let vendedor;
      try {
        vendedor = await VendedorRepo.findOneOrFail({
          where: { Codigo_Vendedor:id},
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(vendedor);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { Codigo_Vendedor, Nombres_Vendedor, Apellidos_Vendedor, Direccion_Vendedor, Telefono_Vendedor,Celular_Vendedor } = req.body;

      //validacion de datos de entrada
      if (!Codigo_Vendedor) {
        return resp.status(404).json({ mensaje: "Debe indicar el codigo del vendedor" });
      }
      if (!Nombres_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre del vendedor" });
      }
      if (!Apellidos_Vendedor) {
        return resp.status(404).json({ mensaje: "Debe indicar los apellidos del vendedor" });
      }
      if (!Direccion_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la direccion del vendedor" });
      }
      if (!Telefono_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Telefono del vendedor" });
      }
      if (!Celular_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el celular del vendedor" });
      }
     

      //validacion de reglas de negocio
      const VendedorRepo = AppDataSource.getRepository(Vendedor);
      const pro = await VendedorRepo.findOne({ where: { Codigo_Vendedor } });

      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "El vendedor ya existe en la base datos." });
      }

      const fecha = new Date();

      let vendedor = new Vendedor();
      vendedor.Codigo_Vendedor = Codigo_Vendedor;
      vendedor.Nombres_Vendedor = Nombres_Vendedor;
      vendedor.Apellidos_Vendedor = Apellidos_Vendedor;
      vendedor.Direccion_Vendedor = Direccion_Vendedor;
      vendedor.Telefono_Vendedor = Telefono_Vendedor;
      vendedor.Celular_Vendedor = Celular_Vendedor;

      //validar con class validator
      const errors = await validate(vendedor, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await VendedorRepo.save(vendedor);
      return resp.status(201).json({ mensaje: "Vendedor creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { Codigo_Vendedor, Nombres_Vendedor, Apellidos_Vendedor, Direccion_Vendedor, Telefono_Vendedor,Celular_Vendedor } = req.body;

    //validacion de datos de entrada
    if (!Codigo_Vendedor) {
      return resp.status(404).json({ mensaje: "Debe indicar el codigo del vendedor" });
    }
    if (!Nombres_Vendedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del vendedor" });
    }
    if (!Apellidos_Vendedor) {
      return resp.status(404).json({ mensaje: "Debe indicar los apellidos del vendedor" });
    }
    if (!Direccion_Vendedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la direccion del vendedor" });
    }
    if (!Telefono_Vendedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el Telefono del vendedor" });
    }
    if (!Celular_Vendedor) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el celular del vendedor" });
    }

    //validacion de reglas de negocio
    const VendedorRepo = AppDataSource.getRepository(Vendedor);
    let pro: Vendedor;
    try {
      pro = await VendedorRepo.findOneOrFail({ where: { Codigo_Vendedor } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

      pro.Nombres_Vendedor = Nombres_Vendedor;
      pro.Apellidos_Vendedor = Apellidos_Vendedor;
      pro.Direccion_Vendedor = Direccion_Vendedor;
      pro.Telefono_Vendedor = Telefono_Vendedor;
      pro.Celular_Vendedor = Celular_Vendedor;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(pro, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await VendedorRepo.save(pro);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };
}

export default VendedorController;
