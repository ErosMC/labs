import { Request, Response, response } from "express"

class clientecontroller{

    static getAll = async (Request: Request, Response:Response) =>{
        return Response.status(200).json({mensaje: 'OK'})
    }
    static getById = async (Request: Request, Response:Response) =>{
        return Response.status(200).json({mensaje: 'OK'})
    }
    static add = async (Request: Request, Response:Response) =>{
        return Response.status(201).json({mensaje: 'Created'})
        
    }
    static update = async (Request: Request, Response:Response) =>{
        
    }
    static delete = async (Request: Request, Response:Response) =>{
        
    }

}


export default clientecontroller