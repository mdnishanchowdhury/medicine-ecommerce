import { prisma } from "../../lib/prisma";


const getUser = async () => {
    return await prisma.user.findMany();
};

const getSingleUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
    });
};

const putSingleUser = async (id: string, payload: any) => {
    return await prisma.user.update({
        where: { id },
        data: payload, 
    });
};

const deleteSingleUser = async (id: string) => {
    return await prisma.user.delete({
        where: { id },
    });
};

export const userServices = {
    getUser,
    getSingleUser,
    putSingleUser,
    deleteSingleUser,
};