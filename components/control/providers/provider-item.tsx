import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import AddProviderButton from './add-provider-button';
import AddProviderModal from './add-provider-moda';

type Props = {
    item: string;
    url: string;
    Icon?: React.ReactNode;
    logo: string;
    siteId: string;
    serviceUrl?: string;
}

const ProviderItem = ({
    item,
    url,
    Icon,
    logo,
    siteId,
    serviceUrl
}: Props) => {
    return (
        <div className='p-4 border-b flex items-center justify-between gap-x-4 hover:shadow-lg hover:bg-blue-50'>
            <div className="flex items-center gap-x-2">
                <Image src={logo} alt='Logo providers' height={32} width={32} />
                <Link target='_blank' href={url} className='flex items-center gap-x-2'>
                    <div className="text-md font-semibold">{item}</div>
                    {Icon && Icon}
                </Link>
            </div>
            <div>
                <AddProviderButton>
                    <AddProviderModal serviceUrl={serviceUrl} siteId={siteId} url={url}/>
                </AddProviderButton>
            </div>
        </div>
    )
}

export default ProviderItem