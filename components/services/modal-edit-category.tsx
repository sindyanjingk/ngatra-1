"use client"
import React, { useEffect, useState } from 'react'
import { useModal } from '../modal/provider';
import { Button } from '../ui/button';
import { formatIDR } from '@/lib/helpers';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { Loader2Icon } from 'lucide-react';
import { Input } from '../ui/input';
import { updateCategory } from '@/lib/action';
import { toast } from 'sonner';

const ModalEditCategory = ({
    catId
} : {
    catId : string
}) => {

    const modal = useModal();
    return (
        <form
            action={async (data: FormData) => {
                const categoryName = data.get('name') as string;
                const result = await updateCategory(categoryName, catId);
                if(result.status){
                    toast.success(result.message);
                    modal?.hide();
                    window.location.reload();
                }else{
                    toast.error(result.message);
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="text-2xl p-6">Edit Category</div>

            {/* Form Body */}
            <div className="flex flex-col space-y-2 p-6 md:p-8">
                <Input type="text" name="name" id="name" placeholder="Category Name" />
            </div>
            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <EditCategoryButton />
            </div>
        </form>
    );
}

export default ModalEditCategory

function EditCategoryButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2Icon className="animate-spin" /> : "Update service"}
        </Button>
    );
}
