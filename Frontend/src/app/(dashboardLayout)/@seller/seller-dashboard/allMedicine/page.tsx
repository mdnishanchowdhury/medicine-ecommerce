import SellerMedicineList from "@/components/Dashboard/SellerComponent/SellerMedicineList";


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <div>
      <SellerMedicineList searchParams={searchParams} />
    </div>
  );
}