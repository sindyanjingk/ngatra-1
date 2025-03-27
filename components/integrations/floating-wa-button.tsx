import Image from "next/image";
import { FC } from "react";

interface FloatingWAButtonProps {
  phone: string;
  message?: string;
}

const FloatingWAButton: FC<FloatingWAButtonProps> = ({ phone, message = "" }) => {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <Image className="w-8 h-8" src="/wa-button.png" alt="WhatsApp" width={32} height={32} />
    </a>
  );
};

export default FloatingWAButton;
