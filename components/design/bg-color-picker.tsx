'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '../ui/button';
import { Loader2Icon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import HeroSection from '../site/hero-section';
import { Label } from '../ui/label';
import SiteNavbar from '../site/navbar';
import ServiceSection from '../site/service-section';
import BenefitSection from '../site/benefit-section';
import Footer from '../site/footer';
import axios from 'axios';
import { toast } from 'sonner';

export default function BgColorPicker({
    bgColor,
    textColorDb,
    siteId,
} : {
    bgColor : string;
    textColorDb : string;
    siteId : string
}) {
    const [color, setColor] = useState<string>(bgColor || "#f3f4f6");
    const [textColor, setTextColor] = useState<string>(textColorDb || "#1f2937");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/designs/bg-color`, {
                bgColor : color, 
                textColor, 
                siteId 
            })
            if(response.status === 200) {
                toast.success('Background color and text color updated successfully');
            }
        } catch (error:any) {
            console.log({error});
            toast.error('Something went wrong');
        }
        setIsLoading(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customize Your Background And Text Color</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center flex-col gap-y-4'>
                <form onSubmit={handleSubmit} className='space-y-3 w-full'>
                    <div className="flex items-center gap-x-8 justify-center">
                        <div className="space-y-2">
                            <Label htmlFor='text-color'>
                                Text Color
                            </Label>
                            <HexColorPicker className='' color={textColor} onChange={setTextColor} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor='bg-color'>
                                Background Color
                            </Label>
                            <HexColorPicker className='' color={color} onChange={setColor} />
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: color,
                        color: textColor,
                        padding: 12
                    }}>
                        {/* <SiteNavbar logo='' /> */}
                        <HeroSection />
                        <ServiceSection />
                        <BenefitSection />
                        <Footer showBanner={true} />
                    </div>
                    <Button type='submit' className='w-full'>
                        {
                            isLoading ?
                            <Loader2Icon/> :
                            "Save"
                        }
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
