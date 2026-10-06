import { redirect } from "next/navigation";

export default async function PropertyCareRenewalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/properties/${id}?tab=care-renewal`);
}
