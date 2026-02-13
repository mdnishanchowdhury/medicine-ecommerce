import AdminMedicineList from "@/components/Dashboard/AdminComponent/AdminMedicineList";


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div>
      <AdminMedicineList searchParams={searchParams} />
    </div>
  );
}