'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const tabs = [
    { id: 'landing', label: 'Landing', image: '/landing.png' },
    { id: 'order', label: 'Order', image: '/orders.png' },
    { id: 'admin', label: 'Admin', image: '/admin-ss.png' },
];

const TabsComponent = () => {
    return (
        <Tabs defaultValue="landing" className="md:w-4/5 flex items-center flex-col mt-60">
            <TabsList className="flex items-center justify-between space-x-4 p-8 bg-white border rounded-full w-3/5">
                <Image src={"/search-landing.png"} alt='get-started' width={60} height={60} className='rounded-3xl' />
                <div className="h-12 border-r-2 w-4 border-gray-400"></div>
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={cn(
                            'px-6 py-2 rounded-full border-2 text-lg transition-colors',
                            'data-[state=active]:bg-black data-[state=active]:text-white',
                            'data-[state=inactive]:bg-white data-[state=inactive]:text-black'
                        )}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="flex justify-center mt-4">
                    <Image src={tab.image} alt={tab.label} width={800} height={800} className=" h-full w-full shadow-md" />
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabsComponent;
