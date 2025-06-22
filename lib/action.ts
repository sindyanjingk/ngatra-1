"use server"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { TAuthFormInputs } from "./type";
import { TUsers } from "@/app/app/(dashboard)/site/[id]/users/page";

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

        if (typeof data.password !== "string") {
            throw new Error("Password must be a string");
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(data.password, salt)

        await prisma.user.create({
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

export const addDiscountAction = async (data: FormData, users: TUsers) => {
    try {
        const discount = data.get("discount") as string;
        await prisma.user.update({
            where: {
                id: users.user.id
            },
            data: {
                discount: parseFloat(discount)
            }
        })
        return {
            status: true,
            message: "Discount created",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Discount created failed",
        };
    }
};

export const deleteDiscountAction = async (data: FormData, users: TUsers[]) => {
    try {
        await prisma.user.updateMany({
            where: {
                id: {
                    in: users.map(user => user.user.id)
                }
            },
            data: {
                discount: 0
            }
        })
        return {
            status: true,
            message: "Discount deleted",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Discount deleted failed",
        };
    }
};

export const updateUserAction = async (data: FormData, users: TUsers) => {
    try {
        const name = data.get("username") as string;
        const email = data.get("email") as string;
        await prisma.user.update({
            where: {
                id: users.user.id
            },
            data: {
                name,
                email
            }
        })
        return {
            status: true,
            message: "Update user success",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Failed update user",
        };
    }
};

export const addBalanceAction = async (balance: number, users: TUsers) => {
    try {

        await prisma.user.update({
            where: {
                id: users.user.id
            },
            data: {
                balance: {
                    increment: +balance
                },
                transaction: {
                    create: {
                        name: "Add By Admin",
                        totalAmount: +balance,
                    }
                }
            }
        })
        return {
            status: true,
            message: "Balance added",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Balance added failed",
        };
    }
};

export const removeBalanceAction = async (balance: number, users: TUsers) => {
    try {

        await prisma.user.update({
            where: {
                id: users.user.id
            },
            data: {
                balance: {
                    decrement: +balance
                },
                transaction: {
                    create: {
                        name: "Remove By Admin",
                        totalAmount: +balance,
                    }
                }
            }
        })
        return {
            status: true,
            message: "Balance removed",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Balance removed failed",
        };
    }
};

export const banUsersAction = async (data: FormData, users: TUsers[]) => {
    try {
        await prisma.user.updateMany({
            where: {
                id: {
                    in: users.map(user => user.userId)
                }
            },
            data: {
                deletedAt: new Date()
            }
        })
        return {
            status: true,
            success: true,
            message: "User banned successfully"
        }
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            success: false,
            message: "Failed to ban user"
        }
    }
}

export const unBanUsersAction = async (data: FormData, users: TUsers[]) => {
    try {
        await prisma.user.updateMany({
            where: {
                id: {
                    in: users.map(user => user.userId)
                }
            },
            data: {
                deletedAt: null
            }
        })
        return {
            status: true,
            success: true,
            message: "User unbanned successfully"
        }
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            success: false,
            message: "Failed to unban user"
        }
    }
}

export const resetPasswordAction = async (data: FormData, users: TUsers) => {
    try {
        const password = data.get("password") as string
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        await prisma.user.update({
            where: {
                id: users.user.id
            },
            data: {
                password: hashedPassword
            }
        })
        return {
            status: true,
            success: true,
            message: "Password reset successfully"
        }
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            success: false,
            message: "Failed to reset password"
        }
    }
}

export const deleteCategory = async (id: string) => {
    try {
        await prisma.category.delete({
            where: {
                id,
            },
        });
        return {
            status: true,
            message: "Category deleted successfully",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category deleted failed",
        };
    }
};

export const deleteAllCategory = async () => {
    try {
        await prisma.category.deleteMany({})
        return {
            status: true,
            message: "Category deleted successfully",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category deleted failed",
        };
    }
}

export const updateCategory = async (name: string, id: string) => {
    try {
        await prisma.category.update({
            where: {
                id,
            },
            data: {
                category_name: name,
            },
        });
        return {
            status: true,
            message: "Category updated successfully",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category updated failed",
        };
    }
};

export const disableServiceByCategory = async (id: string) => {
    try {
        await prisma.siteServices.updateMany({
            where: {
                categoryId: id
            },
            data: {
                isEnabled: false
            }
        });
        return {
            status: true,
            message: "Category disabled successfully",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category disabled failed",
        };
    }
};

export const enableServiceByCategory = async (id: string) => {
    try {
        await prisma.siteServices.updateMany({
            where: {
                categoryId: id
            },
            data: {
                isEnabled: true
            }
        });
        return {
            status: true,
            message: "Category disabled successfully",
        };
    } catch (error) {
        console.log({ error });
        return {
            status: false,
            message: "Category disabled failed",
        };
    }
};  