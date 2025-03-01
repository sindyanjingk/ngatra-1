"use server"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { TAuthFormInputs } from "./type";

export const registerCredentials = async (data: TAuthFormInputs) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (user) {
            return {
                status: false,
                message: "User has been registered",
            };
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.username,
            },
        });
        return {
            status: true,
            message: "Register success"
        }
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Register failed"
        }
    }
}


export const createCategory = async (data: FormData, siteId: string) => {
    try {
        const category = data.get("category") as string;
        const newCategory = await prisma.category.create({
            data: {
                category_name: category,
                siteId
            },
        });
        return {
            status: true,
            message: "Category created",
            data: newCategory,
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category created failed",
        };
    }
};