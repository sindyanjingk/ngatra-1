"use client"
import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { formatIDR } from '@/lib/helpers'
import { TUsers } from '@/app/app/(dashboard)/site/[id]/users/page'
import {
  Edit2Icon, EllipsisIcon, FilePlusIcon,
  FileWarningIcon, FolderPlusIcon, KeyIcon,
  PencilIcon, PercentCircleIcon, ShoppingCartIcon,
  Trash2Icon
} from 'lucide-react'
import { useModal } from '../modal/provider'
import ModalBanAccount from '../users/modal-ban-account'
import ModalUnbanAccount from '../users/modal-unban-account'
import ModalAddDiscount from '../users/modal-add-discount'
import ModalEditUsers from '../users/modal-edit-users'
import ModalDeleteDiscount from '../users/modal-delete-discount'
import ModalManageBalance from '../users/modal-manage-balance'
import ModalResetPassword from '../users/modal-reset-password'
import ModalUserOrders from '../users/modal-user-orders'

type Props = {
  users: TUsers[]
  p: number
}

const UserTable = ({ users, p }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<TUsers[]>([]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? users : []);
  };

  const handleSelectSingle = (user: TUsers, checked: boolean) => {
    setSelectedUsers(prev =>
      checked ? [...prev, user] : prev.filter(selected => selected.user.id !== user.user.id)
    );
  };

  const isAllSelected = selectedUsers.length === users.length && users.length > 0;

  const modal = useModal()

  return (
    <div className="">
      <div className="text-lg my-4 font-bold">List User</div>
      <ScrollArea className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(checked === true)}
                />
              </TableHead>
              {selectedUsers.length !== 0 ? (
                <Popover>
                  <PopoverTrigger className='flex items-center gap-x-4'>
                    <div className="text-green-500 font-bold">{selectedUsers.length}</div>
                    <EllipsisIcon />
                  </PopoverTrigger>
                  <PopoverContent className='md:w-56 space-y-2'>
                    <Button onClick={() => {
                      modal?.show(
                        <ModalBanAccount users={selectedUsers} />
                      )
                    }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                      <FileWarningIcon /> Ban Account
                    </Button>
                    <Button onClick={() => {
                      modal?.show(
                        <ModalUnbanAccount users={selectedUsers} />
                      )
                    }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                      <FilePlusIcon /> Unban Account
                    </Button>
                    <Button  onClick={()=>{
                      modal?.show(
                        <ModalDeleteDiscount users={selectedUsers}/>
                      )
                    }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                      <Trash2Icon /> Delete Discount
                    </Button>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Discount & Price</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.some(selected => selected.user.id === user.user.id)}
                    onCheckedChange={(checked) => handleSelectSingle(user, checked === true)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.user.name}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    modal?.show(
                      <ModalAddDiscount users={user} />
                    )
                  }} className='text-blue-500 font-bold flex items-center' variant="ghost">
                    {
                      user.user.deletedAt && <FileWarningIcon className='text-red-500' />
                    }
                    {
                      user.user.discount ?
                        <>
                          <PercentCircleIcon className='text-yellow-500' /> {user.user.discount}%
                        </>
                        :
                        "Set"
                    }
                  </Button>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{formatIDR(user.user.spent || 0)}</TableCell>
                <TableCell>{formatIDR(user.user.balance || 0)}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <EllipsisIcon className='cursor-pointer' />
                    </PopoverTrigger>
                    <PopoverContent className='md:w-56 space-y-2'>
                      <Button onClick={()=>{
                        modal?.show(
                          <ModalManageBalance users={user}/>
                        )
                      }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                        <FolderPlusIcon /> Manage Balance
                      </Button>
                      <Button onClick={()=>{
                        modal?.show(
                          <ModalEditUsers users={user}/>
                        )
                      }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                        <PencilIcon /> Edit User
                      </Button>
                      <Button onClick={()=>{
                        modal?.show(
                          <ModalResetPassword users={user}/>
                        )
                      }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                        <KeyIcon /> Reset Password
                      </Button>
                      <Button onClick={()=>{
                        modal?.show(
                          <ModalUserOrders users={user}/>
                        )
                      }} variant="ghost" className="w-full flex items-center justify-start gap-2">
                        <ShoppingCartIcon /> User Orders
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

export default UserTable
