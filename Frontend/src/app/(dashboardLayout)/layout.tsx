
import ProfileHeader from "@/components/layout/profileHeader"
import { AppSidebar } from "@/components/layout/sidebar1"
import SearchBar from "@/components/modules/Store/SearchBar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles"
import { userService } from "@/services/user.service"
import { Bell } from "lucide-react"
import React from "react"

export default async function Page({
  admin,
  customer,
  seller,
}: {
  admin: React.ReactNode
  customer: React.ReactNode
  seller: React.ReactNode
}) {
  const { data } = await userService.getSession()
  const userInfo = data?.user

  if (!userInfo) return null

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 transition-colors" />
            <Separator
              orientation="vertical"
              className="h-4 bg-slate-200 hidden md:block"
            />
            <div className="relative hidden lg:block w-full max-w-70 group">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-all">
              <Bell size={20} strokeWidth={2} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <ProfileHeader />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin && admin}
          {userInfo.role === Roles.customer && customer}
          {userInfo.role === Roles.seller && seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
