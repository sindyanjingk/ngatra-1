"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RocketIcon } from "lucide-react"
import Image from "next/image"

const providers = [
  {
    rank: 1,
    name: "asmmr.pro",
    tags: [
      "Telegram подписчики",
      "Telegram 🇷🇺 русские подписчики",
      "Telegram Reactions"
    ],
    currency: "USD",
  },
  {
    rank: 1,
    name: "alipanel.com",
    tags: ["TELEGRAM PREMIUM 🔥", "Telegram classic", "Telegram Reactions"],
    currency: "USD",
  },
  {
    rank: 2,
    name: "teateagram.com",
    tags: ["Premium 45-180 DAYS subscribers", "Premium Telegram subscribers"],
    currency: "USD",
  },
  {
    rank: 3,
    name: "boosttelega.online",
    tags: ["Telegram Boost [БАЗА #1]", "BOT START", "Telegram Premium подписчики"],
    currency: "RUB",
  },
  {
    rank: 4,
    name: "fastsmm-online.ru",
    tags: ["Рефералы для ботов Telegram", "Вывод в топ // Прогрев бота"],
    currency: "USD",
  },
]

export default function TopSocpanelPage() {
  return (
    <div className="min-h-screen bg-white text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Image src="/fire.png" alt="icon" width={48} height={48} />
          </div>
          <h1 className="text-3xl font-bold">Top Socpanel Providers</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Choose best of the best providers. Top is calculated by Socpanel payments, <br />
            so this is a list of panels with biggest money flow
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <span>19583 Users visits</span>
            <span>1770 Providers connected</span>
            <span>1400 Services connected</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Tabs defaultValue="providers">
            <TabsList className="bg-muted rounded-lg">
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="performers">Performers</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            {providers.map((provider, i) => (
              <Card key={i} className="bg-muted/10 border border-white/10">
                <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold w-6">{provider.rank}</span>
                    <span className="font-semibold">{provider.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Show all
                    </Button>
                    <Badge variant="secondary">{provider.currency}</Badge>
                    <Button size="sm">Connect</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="fixed bottom-6 right-6">
          <Button variant="default" className="gap-2">
            <RocketIcon className="w-4 h-4" /> Quick start
          </Button>
        </div>
      </div>
    </div>
  )
}
