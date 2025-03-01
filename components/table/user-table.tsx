import React from 'react'
import SearchTable from './search-table'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import PaginationTable from './pagination-table'
import { Prisma } from '@prisma/client'
import { Button } from '../ui/button'
import { Edit2Icon, Trash2Icon } from 'lucide-react'

type Props = {
    users : (Prisma.userSiteGetPayload<{ include: { user: true, site : true } }>)[] 
    p : number
}

const UserTable = ({users, p}: Props) => {
    
  return (
    <div className="">
      <div className="text-lg my-4 font-bold">List User</div>
      <div className="flex gap-4 items-center justify-between mb-4">
        <div className="w-1/3">
          <SearchTable />
        </div>
      </div>
      {/* tampilan table */}
      <ScrollArea className="w-full overflow-auto">
        <Table className="border border-gray-300">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="border border-gray-300">ID</TableHead>
              <TableHead className="border border-gray-300">Name</TableHead>
              <TableHead className="border border-gray-300">Email</TableHead>
              <TableHead className="border border-gray-300">Role</TableHead>
              <TableHead className="border border-gray-300">Registered</TableHead>
              <TableHead className="border border-gray-300">Site</TableHead>
              <TableHead className="border border-gray-300">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={index} className="border border-gray-300">
                <TableCell className="border border-gray-300">{index + 1}</TableCell>
                <TableCell className="border border-gray-300">{item.user.name || item.user.name}</TableCell>
                <TableCell className="border border-gray-300">{item.user?.email}</TableCell>
                <TableCell className="border border-gray-300">{item.role}</TableCell>
                <TableCell className="border border-gray-300">{item.user.createdAt.toLocaleString()}</TableCell>
                <TableCell className="border border-gray-300">{item.site.name}</TableCell>
                <TableCell className="border border-gray-300 w-12">
                    <div className="flex items-center gap-x-2">
                        <Button variant={"outline"}><Edit2Icon/></Button>
                        <Button variant={"outline"}><Trash2Icon/></Button>
                    </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationTable count={users.length} p={p} />
    </div>
  )
}

export default UserTable