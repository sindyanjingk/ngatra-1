"use client"
import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

type Props = {
  p: number
  count: number
}

const PaginationTable = ({ p, count }: Props) => {
  const router = useRouter()
  const totalPages = Math.ceil(count / 10)
  const hasPrev = p > 1
  const hasNext = p < totalPages

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set("page", newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }

  // Fungsi untuk menampilkan halaman dengan ellipsis jika perlu
  const getDisplayedPages = () => {
    const pages: (number | string)[] = []
    const maxDisplayed = 10

    if (totalPages <= maxDisplayed) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1) // Halaman pertama selalu ditampilkan
    if (p > 4) pages.push("...") // Ellipsis sebelum halaman aktif jika jauh dari awal

    const start = Math.max(2, p - 2)
    const end = Math.min(totalPages - 1, p + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (p < totalPages - 3) pages.push("...") // Ellipsis setelah halaman aktif jika jauh dari akhir
    pages.push(totalPages) // Halaman terakhir selalu ditampilkan

    return pages
  }

  return (
    <>
      <div className="text-md font-semibold mt-4">{`Total data: ${count}`}</div>
      <div className="flex justify-between w-full items-center mt-4">
        <Button disabled={!hasPrev} onClick={() => handleChangePage(p - 1)}>
          Sebelumnya
        </Button>
        <div className="flex items-center gap-x-2">
          {getDisplayedPages().map((page, index) =>
            typeof page === "number" ? (
              <Button
                key={index}
                onClick={() => handleChangePage(page)}
                variant={p === page ? "default" : "outline"}
              >
                {page}
              </Button>
            ) : (
              <span key={index} className="px-2">
                {page}
              </span>
            )
          )}
        </div>
        <Button disabled={!hasNext} onClick={() => handleChangePage(p + 1)}>
          Selanjutnya
        </Button>
      </div>
    </>
  )
}

export default PaginationTable
