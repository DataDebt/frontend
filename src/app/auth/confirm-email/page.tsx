import ConfirmEmailClient from "@/components/auth/ConfirmEmailClient";

interface SearchParams {
  token?: string | string[];
}

function getToken(searchParams: SearchParams): string {
  const rawToken = searchParams?.token;
  return Array.isArray(rawToken) ? (rawToken[0] ?? "") : (rawToken ?? "");
}

export default async function ConfirmEmailPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams;
  const token = getToken(resolvedSearchParams);
  return <ConfirmEmailClient key={token || "missing-token"} token={token} />;
}
