import ConfirmEmailClient from "@/components/auth/ConfirmEmailClient";

function getToken(searchParams) {
  const rawToken = searchParams?.token;
  return Array.isArray(rawToken) ? (rawToken[0] ?? "") : (rawToken ?? "");
}

export default async function ConfirmEmailPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const token = getToken(resolvedSearchParams);
  return <ConfirmEmailClient key={token || "missing-token"} token={token} />;
}
