"use client";

import { useMemo, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "login" | "register" | "forgotPassword";

interface ModeContent {
  title: string;
  subtitle: string;
}

const authModeContent: Record<AuthMode, ModeContent> = {
  login: {
    title: "Welcome Back",
    subtitle: "Sign in to your account",
  },
  register: {
    title: "Create your account",
    subtitle: "Start your data debt assessment journey",
  },
  forgotPassword: {
    title: "Reset your password",
    subtitle: "We will send instructions to your email",
  },
};

export default function LoginScreen() {
  const { clearError, error, login, register, requestPasswordReset, resendVerification } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  const content = useMemo(() => authModeContent[mode], [mode]);

  function switchMode(nextMode: AuthMode) {
    clearError();
    setNotice("");
    setMode(nextMode);
  }

  async function handleLogin(credentials: { email: string; password: string }) {
    setIsSubmitting(true);
    setNotice("");
    clearError();

    try {
      await login(credentials);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(details: { username: string; email: string; password: string }) {
    setIsSubmitting(true);
    setNotice("");
    clearError();

    try {
      const response = await register(details);

      if (response && typeof response === "object" && "status" in response && response.status === "pending_verification") {
        const r = response as { status: string; message?: string };
        setNotice(r.message || "");
      } else {
        setNotice("");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendVerification({ email }: { email: string }) {
    clearError();

    const response = await resendVerification({ email });
    const r = response as Record<string, unknown> | null;
    setNotice(
      (typeof r?.message === "string" ? r.message : null) ||
      (typeof r?.detail === "string" ? r.detail : null) ||
      "Verification instructions sent."
    );
    return response;
  }

  async function handlePasswordReset({ email }: { email: string }) {
    setIsSubmitting(true);
    setNotice("");
    clearError();

    try {
      const response = await requestPasswordReset({ email });
      const r = response as Record<string, unknown> | null;
      setNotice(
        (typeof r?.message === "string" ? r.message : null) ||
        (typeof r?.detail === "string" ? r.detail : null) ||
        "Reset instructions sent. Check your inbox."
      );
      return response;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <AuthShell title={content.title} subtitle={content.subtitle}>
        {mode === "login" ? (
          <LoginForm
            error={error}
            isSubmitting={isSubmitting}
            onForgotPassword={() => switchMode("forgotPassword")}
            onSubmit={handleLogin}
            onSwitchToRegister={() => switchMode("register")}
          />
        ) : null}

        {mode === "register" ? (
          <RegisterForm
            error={error}
            isSubmitting={isSubmitting}
            onResendVerification={handleResendVerification}
            onSubmit={handleRegister}
            onSwitchToLogin={() => switchMode("login")}
            successMessage={notice}
          />
        ) : null}

        {mode === "forgotPassword" ? (
          <ForgotPasswordForm
            error={error}
            isSubmitting={isSubmitting}
            onSubmit={handlePasswordReset}
            onSwitchToLogin={() => switchMode("login")}
            successMessage={notice}
          />
        ) : null}
      </AuthShell>

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
    </>
  );
}
