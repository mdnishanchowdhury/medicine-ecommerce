import { userService } from "@/services/user.service";
import { Mail, Phone, Calendar, Search, CheckCircle2} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserTableActions } from "@/components/Dashboard/AdminComponent/UserTableActions";

export const dynamic = "force-dynamic";

export default async function AllUsersPage() {
    const response = await userService.getUsers();
    const users = response?.data || [];

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen p-4">
            <div className="w-full mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                        <p className="text-slate-500 font-medium text-sm">Total {users.length} users registered</p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none"
                        />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[13px] font-black text-black">User Info</th>
                                    <th className="px-6 py-4 text-[13px] font-black text-black">Contact</th>
                                    <th className="px-6 py-4 text-[13px] font-black text-black">Role & Status</th>
                                    <th className="px-6 py-4 text-[13px] font-black text-black">Joined</th>
                                    <th className="px-6 py-4 text-[13px] font-black text-black text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {
                                users.map((user: any) => (
                                    <tr key={user._id || user.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative size-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                                                    <img
                                                        src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                                                        alt={user.name}
                                                        className="object-cover size-full"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                                                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                                        <Mail size={10} /> {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Phone size={12} className="text-slate-400" />
                                                <span className="text-xs font-bold">{user.phone || "No Phone"}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={cn(
                                                    "w-fit px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                                    user.role === 'ADMIN' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                                )}>
                                                    {user.role}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                                    <CheckCircle2 size={10} />
                                                    {user.status || 'ACTIVE'}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Calendar size={12} />
                                                <span className="text-xs font-medium">{formatDate(user.createdAt)}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <UserTableActions 
                                                userId={user._id || user.id} 
                                                userName={user.name} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}