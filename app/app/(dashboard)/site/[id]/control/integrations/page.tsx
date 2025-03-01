
import IntegrationItem from '../../../../../../../components/integrations/integration-item'
import React from 'react'

type Props = {}

const Integrations = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Integration Settings</div>
      <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <IntegrationItem rightIcon={`/google-button.png`} title='Google Oauth'>
           <div className="text-xl">Popup</div>
          </IntegrationItem>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <IntegrationItem rightIcon={`/google-tag-manager.png`} title='Google Tag Manager'>
           <div className="text-xl">Popup</div>
          </IntegrationItem>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <IntegrationItem rightIcon={`/google-analytics.png`} title='Google Analytics'>
           <div className="text-xl">Popup</div>
          </IntegrationItem>
        </div>
        <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <IntegrationItem rightIcon={`/wa-button.png`} title='WhatsApp Button'>
           <div className="text-xl">Popup</div>
          </IntegrationItem>
        </div>
      </div>
    </div>
  )
}

export default Integrations