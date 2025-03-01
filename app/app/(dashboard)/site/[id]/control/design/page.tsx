
import BgColorPicker from "../../../../../../../components/design/bg-color-picker";
import ColorPicker from "../../../../../../../components/design/color-picker";
import UploadLogo from "../../../../../../../components/design/upload-logo";
import prisma from "../../../../../../../lib/prisma";


export default async function SiteSettingsAppearance({
  params,
}: {
  params: { id: string };
}) {
    const data = await prisma.sites.findFirst({
      where: {
        id: params.id,
      },
    });
    const siteDesigns = await prisma.siteDesigns.findFirst({
      where : {
        siteId : params.id
      }
    })
  return (
    <div className='flex flex-col gap-y-4 md:w-full bg-white dark:bg-black rounded-md p-4'>
      <div className="text-md font-semibold text-xl">{`Design & Content`}</div>
      <p className="mt-2 text-gray-400">
        Customize the appearance of your site. Upload images, select a font, and add personalized messages to enhance your branding.
      </p>
      <UploadLogo defaultLogo={siteDesigns?.logo || ""} siteId={params.id}/>
      <BgColorPicker siteId={params.id} bgColor={siteDesigns?.backgroundColor || ""} textColorDb={siteDesigns?.textColor || ""} />
      <ColorPicker bgColor={siteDesigns?.buttonColor || ""} siteId={params.id}/>
    </div>
  );
}
