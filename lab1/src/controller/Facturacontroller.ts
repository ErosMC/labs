import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cabezera_Factura } from "../entity/Cabezera_Factura";
import { Detalle_Factura } from "../entity/Detalle_Factura";
import { validate } from "class-validator";

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const Cabezera_FacturaRepo = AppDataSource.getRepository(Cabezera_Factura);
      const Detalle_FacturaRepo = AppDataSource.getRepository(Detalle_Factura);

      const listaFactura = await Cabezera_FacturaRepo.find({
        where: { Estado: true },
      }) || await Detalle_FacturaRepo.find({}) ;

      if (listaFactura.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaFactura);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el Numero" });
      }

      const Cabezera_FacturaRepo = AppDataSource.getRepository(Cabezera_Factura);
      const Detalle_FacturaRepo = AppDataSource.getRepository(Detalle_Factura);

      let producto;
      try {
        producto = await Cabezera_FacturaRepo.findOneOrFail({
          where: { Numero: id, Estado: true },
        }) || await Detalle_FacturaRepo.findOneOrFail({
          where: { Numero: id},
        }) ;
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro la Factura con ese Numero" });
      }

      return resp.status(200).json(producto);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { Numero, Fecha, Ruc_Cliente, Codigo_Vendedor, Codigo_producto, Cantidad } = req.body;

      //validacion de datos de entrada
      if (!Numero) {
        return resp.status(404).json({ mensaje: "Debe indicar el numero de la factura" });
      }

      if (!Ruc_Cliente) {
        return resp.status(404).json({ mensaje: "Debe indicar el Numero del cliente" });
      }
      if (!Codigo_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Codigo_Vendedor del " });
      }
      if (!Codigo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Codigo_producto" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "La cantidad debe ser mayor que ser" });
      }

      //validacion de reglas de negocio

      const Cabezera_FacturaRepo = AppDataSource.getRepository(Cabezera_Factura);
      const Detalle_FacturaRepo = AppDataSource.getRepository(Detalle_Factura);

      const Fecha = new Date();

      Cabezera_Factura.Numero = Numero;
      Cabezera_Factura.Ruc_Cliente = Ruc_Cliente;
      Cabezera_Factura.Codigo_Vendedor = Codigo_Vendedor;
      Cabezera_Factura.Fecha = Fecha;

      Detalle_Factura.Codigo_producto = Codigo_producto;
      Detalle_Factura.Cantidad = Cantidad;
      Detalle_Factura.Numero = Numero;


      await Cabezera_FacturaRepo.save(Cabezera_Factura);
      await Detalle_FacturaRepo.save(Detalle_Factura);
      return resp.status(201).json({ mensaje: "Fatura creada" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }


  };

  static update = async (req: Request, resp: Response) => {
    const { Numero, Fecha, Ruc_Cliente, Codigo_Vendedor, Codigo_producto, Cantidad } = req.body;

      //validacion de datos de entrada
      if (!Numero) {
        return resp.status(404).json({ mensaje: "Debe indicar el numero de la factura" });
      }

      if (!Ruc_Cliente) {
        return resp.status(404).json({ mensaje: "Debe indicar el Numero del cliente" });
      }
      if (!Codigo_Vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Codigo_Vendedor del " });
      }
      if (!Codigo_producto) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Codigo_producto" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({ mensaje: "La cantidad debe ser mayor que ser" });
      }

      //validacion de reglas de negocio

      const Cabezera_FacturaRepo = AppDataSource.getRepository(Cabezera_Factura);
      const Detalle_FacturaRepo = AppDataSource.getRepository(Detalle_Factura);

      const Fecha = new Date();

      Cabezera_Factura.Numero = Numero;
      Cabezera_Factura.Ruc_Cliente = Ruc_Cliente;
      Cabezera_Factura.Codigo_Vendedor = Codigo_Vendedor;
      Cabezera_Factura.Fecha = Fecha;

      Detalle_Factura.Codigo_producto = Codigo_producto;
      Detalle_Factura.Cantidad = Cantidad;
      Detalle_Factura.Numero = Numero;


      await Cabezera_FacturaRepo.save(Cabezera_Factura);
      await Detalle_FacturaRepo.save(Detalle_Factura);
      return resp.status(201).json({ mensaje: "Fatura creada" });
    catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  }
  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const Cabezera_FacturaRepo = AppDataSource.getRepository(Cabezera_Factura);
      let pro: Cabezera_Factura;
      try {
        pro = await Cabezera_FacturaRepo.findOneOrFail({
          where: { Numero: id, Estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el producto con ese ID" });
      }

      pro.Estado = false;
      try {
        await Cabezera_FacturaRepo.save(pro);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default FacturaController;
