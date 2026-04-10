import ResetPasswordClient from "@/components/auth/ResetPasswordClient";

function getToken(searchParams) {
  const rawToken = searchParams?.token;
  return Array.isArray(rawToken) ? (rawToken[0] ?? "") : (rawToken ?? "");
}

export default async function ResetPasswordPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const token = getToken(resolvedSearchParams);
  return <ResetPasswordClient key={token || "missing-token"} token={token} />;
}
