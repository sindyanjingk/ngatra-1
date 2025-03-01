'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../ui/button';
import { Loader2Icon, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import axios from 'axios';

export default function ColorPicker({
    siteId,
    bgColor
}: {
    siteId: string
    bgColor: string
}) {
    const [color, setColor] = useState<string>(bgColor || '#1FA32B');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("trigerred");
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/designs/button-color`, {
                bgColor: color,
                siteId
            })            
            if (response.status === 200) {
                toast.success('Success update designs.');
            }
        } catch (error) {
            console.log({ error });
            toast.error('Error update designs.');
        }
        setIsLoading(false)
    }
    return (
        <Card>
            <CardContent className='flex items-center flex-col gap-y-4'>
                <form className='space-y-4 flex items-center flex-col' onSubmit={async (e)=>{
                    await submit(e)
                }}>
                    <div className="flex items-center gap-x-8 my-4 space-y-2 pb-4 border-b w-full justify-center">
                        <div style={{ color }} className={`text-md font-semibold `}>Active link preview</div>
                        <Button style={{
                            backgroundColor: color
                        }}>
                            Button Preview
                        </Button>
                        <div style={{ color }} className={`text-md font-semibold flex items-center gap-x-4`}>Icon preview <ShoppingCart /></div>
                    </div>
                    <HexColorPicker className='' color={color} onChange={setColor} />
                    <Button type='submit' className='w-full'>
                        {
                            isLoading ?
                            <Loader2Icon className='animate-spin' /> :
                            "Save"
                        }
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
