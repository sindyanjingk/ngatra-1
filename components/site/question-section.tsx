"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const QuestionSection = ({
  areFollowers,
  areFollowersDesc,
  howToTrack,
  howToTrackDesc,
  isSecure,
  isSecureDesc,
  guarantees,
  guaranteesDesc,
}: {
  areFollowers?: string;
  areFollowersDesc?: string;
  howToTrack?: string;
  howToTrackDesc?: string;
  isSecure?: string;
  isSecureDesc?: string;
  guarantees?: string;
  guaranteesDesc?: string;
}) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <Accordion type="single" collapsible className="w-full md:px-20 mt-20">
      {[
        {
          value: "item-1",
          title: guarantees,
          content: guaranteesDesc
        },
        {
          value: "item-2",
          title: isSecure,
          content: isSecureDesc,
        },
        {
          value: "item-3",
          title: howToTrack,
          content: howToTrackDesc,
        },
        {
          value: "item-4",
          title: areFollowers,
          content: areFollowersDesc
        }
      ].map(({ value, title, content }) => (
        <AccordionItem key={value} value={value} className="border-b">
          <AccordionTrigger
            onClick={() => toggleItem(value)}
            className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium hover:bg-gray-100 transition-all"
          >
            {title}
          </AccordionTrigger>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: openItem === value ? "auto" : 0, opacity: openItem === value ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <AccordionContent className="px-4 py-2 text-gray-700">{content}</AccordionContent>
          </motion.div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default QuestionSection;
