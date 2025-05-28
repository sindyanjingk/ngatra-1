"use client";
import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { category, siteProviders } from "@prisma/client";
import { Iservices } from "../control/providers/add-provider-moda";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { convertUsdToIdr, formatIDR, oneUsd } from "@/lib/helpers";
import Link from "next/link";

export default function ImportServicesModal({
  siteId,
  providers,
  categories,
}: {
  siteId: string;
  providers: siteProviders[];
  categories: category[];
}) {
  const modal = useModal();
  const [selectedProvider, setSelectedProvider] = useState<siteProviders>(providers[0] || { id: "" });
  const [services, setServices] = useState<Iservices[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [extraPrice, setExtraPrice] = useState(30);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const transformData = providers.map((item) => ({
    label: item.name,
    value: item,
  }));

  const transformCategories = categories.map((item) => ({
    label: item.category_name,
    value: item.id,
  }));

  const [selected, setSelected] = useState<Iservices[]>([]);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/services`, {
        siteId,
        url: selectedProvider.url,
        name: selectedProvider.name,
        apiKey: selectedProvider.apiKey,
      });
      if (response.status === 200) {
        const transform = response.data.data?.map((item: any, index: number) => ({
          ...item,
          id: index,
        }));
        setServices(transform);
        setSelected([]);
      }
    } catch (error) {
      console.log({ error });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedProvider.id) {
      getServices();
    }
  }, [selectedProvider.id]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [services, debouncedQuery]);

  const isAllSelected = filteredServices.length > 0 && selected.filter(s => filteredServices.some(f => f.id === s.id)).length === filteredServices.length;

  const isSomeSelected = selected.some((item) =>
    filteredServices.some((service) => service.id === item.id)
  ) && !isAllSelected;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      const remainingSelected = selected.filter(
        (item) => !filteredServices.some((service) => service.id === item.id)
      );
      setSelected(remainingSelected);
    } else {
      const newSelected = [
        ...selected.filter(
          (item) => !filteredServices.some((service) => service.id === item.id)
        ),
        ...filteredServices,
      ];
      setSelected(newSelected);
    }
  };

  const toggleService = (service: Iservices) => {
    setSelected((prev) =>
      prev.some((item) => item.id === service.id)
        ? prev.filter((item) => item.id !== service.id)
        : [...prev, service]
    );
  };

  const createServices = async () => {
    if (!categoryId) {
      toast.error("Please select category");
      return;
    }
    setIsLoadingCreate(true);
    try {
      const response = await axios.post(`/api/create-bulk-services`, {
        siteId,
        providerId: selectedProvider.id,
        categoryId: categoryId,
        selected: selected || [],
        extraPrice,
      });
      if (response.status === 200) {
        toast.success("Successfully created services");
        modal?.hide();
        window.location.reload();
      }
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong");
    }
    setIsLoadingCreate(false);
  };

  if (providers.length === 0) {
    return (
      <div className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400">
        <div className="p-4">Please Add Provider First</div>
        <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={modal?.hide}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <Link href={"control/providers"}>
            <Button onClick={modal?.hide}>Add Provider</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400">
      {isNext ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
          <Image src={"/services.svg"} alt="services" height={40} width={40} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Select Category & Set Price</h2>
          <Button onClick={() => setIsNext(false)} type="button">Back</Button>
          <div className="flex flex-col gap-y-2 w-full">
            <label>Category</label>
            <Select onValueChange={e => setCategoryId(e)}>
              <SelectTrigger className="md:w-full">
                <SelectValue placeholder={"Select Category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="same">Same As Categories</SelectItem>
                {transformCategories.map((item, index) => (
                  <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="my-4 border-b pb-2 flex items-start justify-between w-full">
            <div className="flex flex-col gap-y-1">
              <div className="font-semibold">Extra price in %</div>
              <div className="text-gray-400">Additional percent to provider price</div>
            </div>
            <Input onChange={e => setExtraPrice(+e.target.value)} defaultValue={extraPrice} type="number" className="w-20" />
          </div>

          <ScrollArea className="h-80 w-full rounded-md">
            {selected.map((item, index) => (
              <div key={index} className="my-4 border-b pb-2 flex items-start justify-between w-full">
                <div className="text-md font-semibold">{item.service}</div>
                <div className="text-md font-semibold">
                  {selectedProvider.currency === "IDR"
                    ? formatIDR(item.rate ? +item.rate : 0)
                    : convertUsdToIdr(item.rate ? +item.rate : 0, oneUsd)}
                </div>
                <div className="text-md font-semibold">
                  {selectedProvider.currency === "IDR"
                    ? item?.rate
                      ? formatIDR(Math.round(+item.rate * extraPrice / 100) + Number(item.rate))
                      : "Rp0"
                    : convertUsdToIdr(+item.rate! * (extraPrice / 100) + Number(item.rate), oneUsd)}
                </div>
                <ArrowRight />
                <Input className="w-20" type="number" value={extraPrice} />
              </div>
            ))}
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
          <Image src={"/services.svg"} alt="services" height={40} width={40} />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Select Providers And Services</h2>
          <div className="flex flex-col gap-y-2 w-full">
            <label>Provider</label>
            <Select onValueChange={e => setSelectedProvider(JSON.parse(e))}>
              <SelectTrigger className="md:w-full">
                <SelectValue placeholder={selectedProvider.name} />
              </SelectTrigger>
              <SelectContent>
                {transformData.map((item, index) => (
                  <SelectItem key={index} value={JSON.stringify(item.value)}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {services.length !== 0 &&
            <Input placeholder="Search Service" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          }
          {isLoading ? (
            <Loader2Icon className="animate-spin h-20 w-20" />
          ) : (
            <ScrollArea className="h-80 w-full rounded-md border">
              <div className="p-4 border rounded-lg w-full space-y-2">
                <div className="flex items-center gap-2 my-2">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-checked={isSomeSelected ? 'mixed' : undefined}
                  />
                  <span>Select All</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{filteredServices.length}</span>
                </div>
                <div className="space-y-1 my-2">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="flex items-center gap-2 border-b pb-2">
                      <Checkbox
                        checked={selected.some((item) => item.id === service.id)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <button type="button" onClick={modal?.hide}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">Cancel</button>
        {isNext ? (
          <Button onClick={createServices} type="button">
            {isLoadingCreate ? <Loader2Icon className="animate-spin" size={18} /> : `Add ${selected.length} services`}
          </Button>
        ) : (
          selected.length > 0 && (
            <Button type="button" onClick={() => setIsNext(true)}>
              Next
            </Button>
          )
        )}
      </div>
    </form>
  );
}
