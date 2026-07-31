import type { Metadata } from "next";
import TableExperience from "@/components/table/TableExperience";

export const metadata: Metadata = {
  title: "Menú en la mesa",
  description: "Escanea, explora la carta y pide directo a cocina desde tu celular.",
  robots: { index: false, follow: false },
};

export default async function MesaPage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const clean = decodeURIComponent(table).replace(/[^0-9A-Za-z]/g, "").slice(0, 4) || "1";
  return <TableExperience table={clean} />;
}
