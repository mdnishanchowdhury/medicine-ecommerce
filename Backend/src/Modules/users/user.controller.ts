import { Request, Response } from "express";
import { userServices } from "./user.service";


const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.getSingleUser(id as string);

        if (!result) {
            return res.status(404).json({ success: false, message: "User not Found" });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const putSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.putSingleUser(id as string, req.body);

        res.status(200).json({
            success: true,
            message: "User Updated successfully",
            data: result
        });
    } catch (error: any) {
        const status = error.code === 'P2025' ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.deleteSingleUser(id as string);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            data: result,
        });
    } catch (error: any) {
        const status = error.code === 'P2025' ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

export const userControllers = {
    getUser,
    getSingleUser,
    putSingleUser,
    deleteSingleUser
}