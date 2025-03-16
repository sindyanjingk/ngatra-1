import { Input } from "@/components/ui/input";
import { formatIDR } from "@/lib/helpers";
import { siteServices } from "@prisma/client";
import React, { useState } from "react";

type Props = {
    serviceId: string;
    name: string;
    providersRate: number;
    rate: number;
    extraPrice: number;
    setChangedServices: React.Dispatch<React.SetStateAction<siteServices[]>>;
};

const ServicePriceItem = ({ serviceId, name, providersRate, rate, extraPrice, setChangedServices }: Props) => {
    const [extraPriceValue, setExtraPriceValue] = useState(extraPrice);
    const [updatedRate, setUpdatedRate] = useState(rate);

    // Update harga akhir berdasarkan extraPrice yang baru
    const handleExtraPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newExtraPrice = parseFloat(e.target.value) || 0;
        setExtraPriceValue(newExtraPrice);

        // Hitung harga setelah ditambah persen
        const newRate = providersRate + (providersRate * (newExtraPrice / 100));
        setUpdatedRate(newRate);

        setChangedServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? { ...service, extraPrice: newExtraPrice, rate: newRate }
                    : service
            )
        );
    };

    return (
        <div className="flex items-center gap-x-4">
            <div className="text-md w-1/4">{name}</div>
            <div className="text-md w-1/4">{formatIDR(providersRate)}</div>
            <div className="text-md w-1/4">{formatIDR(updatedRate)}</div>
            <div className="text-md w-1/4">
                <Input type="number" value={extraPriceValue} onChange={handleExtraPriceChange} />
            </div>
        </div>
    );
};

export default ServicePriceItem;
