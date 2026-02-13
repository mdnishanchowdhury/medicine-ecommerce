import { Request, Response } from "express";

export function notFount (req:Request,res:Response){
res.status(404).json({
   message:"Route not found!",
   path:req.originalUrl,
   date: Date()
})
}