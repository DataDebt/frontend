import ConfirmEmailClient from "@/components/auth/ConfirmEmailClient";

function getToken(searchParams) {
  const rawToken = searchParams?.token;
  return Array.isArray(rawToken) ? (rawToken[0] ?? "") : (rawToken ?? "");
}

export default async function ConfirmEmailPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return <ConfirmEmailClient token={getToken(resolvedSearchParams)} />;
}
