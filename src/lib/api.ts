import { Tariff } from "@/types/tariff";

export async function getTariffs(): Promise<Tariff[]> {
  const response = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить тарифы");
  }

  const data: Tariff[] = await response.json();
  return data;
}