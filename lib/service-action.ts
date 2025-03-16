"use server";

import { siteServices } from "@prisma/client";
import prisma from "./prisma";


export const disableAllServices = async (ids: string[]) => {
    try {
        await prisma.siteServices.updateMany({
            data: {
                isEnabled: false,
            },
            where: {
                id: {
                    in: ids, // Perbaikan di sini
                },
            },
        });

        return {
            success: true,
            message: "Successfully disabled services",
        }; // Return hasil agar bisa digunakan
    } catch (error) {
        console.error("Error disabling services:", error);
        return {
            success: false,
            message: "Failed to disable services",
        };
    }
};

export const enableAllServices = async (ids: string[]) => {
    try {
        await prisma.siteServices.updateMany({
            data: {
                isEnabled: true,
            },
            where: {
                id: {
                    in: ids, // Perbaikan di sini
                },
            },
        });

        return {
            success: true,
            message: "Successfully disabled services",
        }; // Return hasil agar bisa digunakan
    } catch (error) {
        console.error("Error disabling services:", error);
        return {
            success: false,
            message: "Failed to disable services",
        };
    }
};


export const changeAllCategories = async (ids: string[], categoryId: string) => {
    try {
        await prisma.siteServices.updateMany({
            data: {
                categoryId: categoryId,
            },
            where: {
                id: {
                    in: ids, // Perbaikan di sini
                },
            },
        });

        return {
            success: true,
            message: "Successfully disabled services",
        }; // Return hasil agar bisa digunakan
    } catch (error) {
        console.error("Error change category:", error);
        return {
            success: false,
            message: "Failed to change category",
        };
    }
}

export const deleteAllServices = async (ids: string[]) => {
    try {
        await prisma.siteServices.deleteMany({
            where: {
                id: {
                    in: ids, // Perbaikan di sini
                },
            },
        });
        return {
            success: true,
            message: "Successfully delete all services",
        }; // Return hasil agar bisa digunakan
    } catch (error) {
        console.error("Error delete services :", error);
        return {
            success: false,
            message: "Failed to delete services",
        };
    }
}

export const changeNameAndDescriptionServices = async (items: { id: string; name: string; description: string }[]) => {
    try {
        await prisma.$transaction(
            items.map((item) =>
                prisma.siteServices.update({
                    where: { id: item.id },
                    data: {
                        name: item.name,
                        description: item.description
                    }
                })
            )
        );

        return {
            success: true,
            message: "Successfully changed name and description"
        };
    } catch (error) {
        console.error("Error updating services:", error);
        return {
            success: false,
            message: "Failed to change name and description"
        };
    }
};

export const changeAllPriceServices = async (items: siteServices[]) => {
    try {
        await prisma.$transaction(
            items.map((item) =>
                prisma.siteServices.update({
                    where: { id: item.id },
                    data: {
                        rate: item.rate,
                        extraPrice: item.extraPrice
                    }
                })
            )
        );

        return {
            success: true,
            message: "Successfully change price"
        };
    } catch (error) {
        console.log({ error });
        return {
            success: false,
            message: "Failed to change price"
        };
    }
}

export async function addServiceAction(data: {
    name: string;
    description: string;
    categoryId: string;
    min: string;
    max: string;
    price: string;
    siteId: string;
}) {
    try {
        await prisma.siteServices.create({
            data: {
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                min: parseInt(data.min),
                max: parseInt(data.max),
                rate: parseInt(data.price),
                siteId: data.siteId, // Sesuaikan dengan siteId yang sesuai
                updatedAt: new Date(),
                createdAt: new Date()
            },
        });
        return {
            success: true,
            message: "Successfully added service",
        }
    } catch (error) {
        console.error("Error adding service:", error);
        return {
            success: false,
            message: "Failed to add service",
        }
    }
}

export async function updateServiceAction(serviceId: string, formData: Record<string, any>) {
    try {
        await prisma.siteServices.update({
            where: { id: serviceId },
            data: {
                name: formData.name,
                description: formData.description,
                categoryId: formData.categoryId,
                min: Number(formData.min),
                max: Number(formData.max),
                rate: formData.rate ? Number(formData.rate) : null,
                dripfeed: formData.dripfeed === "on",
                refill: formData.refill === "on",
                cancel: formData.cancel === "on",
                isEnabled: formData.isEnabled === "on",
            },
        });

        return { success: true, message: "Successfully updated service" };
    } catch (error) {
        console.error("Error updating service:", error);
        return { success: false, error: "Failed to update service" };
    }
}