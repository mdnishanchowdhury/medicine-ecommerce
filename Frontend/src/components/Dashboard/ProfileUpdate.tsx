"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, ShieldCheck, Loader2, Save, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateUserAction } from "@/actions/user";

export default function ProfileUpdate() {
  const { data: session, isPending } = authClient.useSession();
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhone((session.user as any).phone || "");
    }
  }, [session]);

  const handleUpdate = async () => {
    if (!session?.user?.id) return;

    setUpdating(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const result = await updateUserAction(session.user.id, {
        name,
        phone,
      });

      if (result.error) {
        toast.error(result.error.message, { id: toastId });
      } else {
        toast.success("Profile updated successfully!", { id: toastId });
        await authClient.getSession();
      }
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-10">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm border-slate-200">
          <CardContent className="pt-8">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl mb-4">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-blue-600 text-white text-4xl font-bold">
                  {name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {name || "User Name"}
              </h2>

              <span className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {(session?.user as any)?.role || "CUSTOMER"}
              </span>

              <hr className="w-full my-6 border-slate-100" />

              <div className="space-y-3 w-full">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <p className="text-sm truncate">{session?.user?.email}</p>
                </div>

                {phone && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <p className="text-sm font-medium">{phone}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
            <CardDescription>Update your name and phone number.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid gap-2 opacity-70">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input id="email" value={session?.user?.email} disabled className="pl-10 bg-slate-50 cursor-not-allowed" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleUpdate}
                disabled={updating}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 min-w-35"
              >
                {updating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {updating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}