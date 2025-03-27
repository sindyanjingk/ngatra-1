"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  className?: string;
}

export function DateRangePicker({ className }: DateRangePickerProps) {
  // ⬇ Gunakan tipe DateRange dari react-day-picker
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Pilih tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={setDate} // ⬅ Sekarang tidak error karena tipe sudah cocok
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
