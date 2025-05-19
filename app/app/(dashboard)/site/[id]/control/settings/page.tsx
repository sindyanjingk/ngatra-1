
import ButtonBanner from '@/components/settings/button-banner'
import CurrencyModal from '@/components/settings/currency-modal'
import DomainSettingsModal from '@/components/settings/domain-settings-moda'
import FastOrderModal from '@/components/settings/fast-order-modal'
import MetaDataModal from '@/components/settings/meta-data-modal'
import ServiceSettingModal from '@/components/settings/service-setting-modal'
import SettingsItem from '@/components/settings/settings-item'
import ShowPanelOrder from '@/components/settings/show-panel-order'
import ShowUserSpent from '@/components/settings/show-user-spent'
import prisma from '@/lib/prisma'
import { BanknoteIcon, CheckCircle2Icon, Globe2Icon, InspectIcon, Layers2, ShoppingCartIcon, XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Settings = async ({
    params,
}: {
    params: { id: string };
}) => {
    const siteSettings = await prisma.siteSettings.findFirst({
        where: {
            siteId: params.id
        }
    })

    return (
        <div className='flex flex-col gap-y-4 md:w-full'>
            <div className="text-md font-semibold text-xl">General Settings</div>

            {/* banner */}
            <div className=" rounded-lg border shadow-sm flex justify-between items-center w-full">
                <div className='flex flex-col gap-y-4 p-4 border-r md:w-1/2'>
                    <h4 className="font-semibold text-lg">Activate banner & get benefits</h4>
                    <p className="text-md flex items-center gap-x-4 font-semibold">{siteSettings?.showBanner ? <CheckCircle2Icon className='text-green-700' /> : <XCircleIcon className='text-red-500' />} Listing in top providers</p>
                    <p className="text-md flex items-center gap-x-4 font-semibold">{siteSettings?.showBanner ? <CheckCircle2Icon className='text-green-700' /> : <XCircleIcon className='text-red-500' />} You are helping Ngatra to improve</p>
                </div>
                <div className="px-3 py-1 text-sm rounded-md flex items-center flex-col gap-y-2 justify-center w-1/2">
                    <div className="p-4 shadow-sm font-semibold border rounded-md flex items-center gap-x-2">
                        <Image src={"/ngatra-logo.svg"} alt='ngatra -loho' height={32} width={32} />
                        Made by Ngatra
                    </div>
                    <ButtonBanner siteId={params.id} showBanner={siteSettings?.showBanner!} />
                </div>
            </div>

            {/* orders and services */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<Layers2 />} title='Service settings' >
                        <ServiceSettingModal
                            siteId={params.id}
                            cancel={siteSettings?.cancelFail || false}
                            average={siteSettings?.averageComplete || false}
                            showApi={siteSettings?.showApiPage || false}
                            showMultiple={siteSettings?.showMultiple || false}
                            showService={siteSettings?.showServicesPage || false}
                        />
                    </SettingsItem>
                </div>
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<ShoppingCartIcon />} title='Fast order' >
                        <FastOrderModal
                            disc={siteSettings?.dicount || "0"}
                            siteId={params.id}
                            fast={siteSettings?.fastOrder || false}
                            orderPage={siteSettings?.showOrder || false}
                            purchase={siteSettings?.showRecentPurchase || false}
                            showDisc={siteSettings?.showDiscount || false}
                        />
                    </SettingsItem>
                </div>
            </div>

            {/* currency */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    {/* <div className="flex items-center gap-x-2">
                        <BanknoteIcon />
                        <h5 className="font-semibold">Currency</h5>
                    </div>
                    <ChevronRightIcon /> */}
                    <SettingsItem rightIcon={<BanknoteIcon />} title='Currency'>
                        <CurrencyModal siteId={params.id} />
                    </SettingsItem>
                </div>
            </div>

            {/* metadata */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<InspectIcon />} title='Meta data' >
                        <MetaDataModal
                            siteId={params.id}
                            pageTitle={siteSettings?.pageTitle || ""}
                            pageDescription={siteSettings?.pageDescription || ""}
                            pageKeywords={siteSettings?.pageKeywords || ""}
                            pageFooterTags={siteSettings?.footerTags || ""}
                            pageMetaTags={siteSettings?.metaTags || ""}
                        />
                    </SettingsItem>
                </div>
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<Globe2Icon />} title='Domain Settings' >
                        <DomainSettingsModal />
                    </SettingsItem>
                </div>
            </div>

            {/* other */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <ShowPanelOrder isShow={siteSettings?.showTotalPanel || false} siteId={params.id} />
                <ShowUserSpent isShow={siteSettings?.showUserSpent || false} siteId={params.id} />
            </div>
        </div>
    )
}

export default Settings