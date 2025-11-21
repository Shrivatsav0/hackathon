"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "lucide-react";
import SignIn from "./sign-in-form";
import SignUp from "./sign-up-form";
import { EmailVerification } from "./email-verification";
import { Button } from "@/components/ui/button";

type AuthMode = "signin" | "signup";
type SignUpStep = "form" | "verification";

interface AuthLayoutProps {
    initialMode?: AuthMode;
}

export function AuthLayout({ initialMode = "signin" }: AuthLayoutProps = {}) {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [signUpStep, setSignUpStep] = useState<SignUpStep>("form");
    const [signUpEmail, setSignUpEmail] = useState("");

    const handleSignIn = (data: { email: string; password: string }) => {
        console.log("Sign in:", data);
        router.push("/onboarding");
    };

    const handleSignUp = (data: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        console.log("Sign up:", data);
        // Store email and move to verification step
        setSignUpEmail(data.email);
        setSignUpStep("verification");
        // TODO: Send verification email to backend
    };

    const handleEmailVerification = (code: string) => {
        console.log("Verification code:", code);
        // TODO: Verify code with backend
        router.push("/onboarding");
    };

    const handleBackToSignUp = () => {
        setSignUpStep("form");
    };

    const handleResendCode = async () => {
        console.log("Resending verification code to:", signUpEmail);
        // TODO: Resend verification email
        return Promise.resolve();
    };

    const handleGoogleAuth = () => {
        console.log(mode === "signin" ? "Google sign-in" : "Google sign-up");
        router.push("/onboarding");
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Panel - Auth Form */}
            <div className="w-full flex items-center justify-center p-6 lg:p-12 overflow-y-auto scrollbar-hide">
                <div className="w-full max-w-md">
                    {/* Logo & Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <Box className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">
                                    EventSync
                                </h1>
                                <p className="text-sm text-muted-foreground transition-opacity duration-200">
                                    {mode === "signin"
                                        ? "Welcome back"
                                        : "Create your account"}
                                </p>
                            </div>
                        </div>

                        {signUpStep === "form" && (
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2 transition-opacity duration-200">
                                    {mode === "signin"
                                        ? "Sign in to your account"
                                        : "Start your journey"}
                                </h2>
                                <p className="text-sm text-muted-foreground transition-opacity duration-200">
                                    {mode === "signin"
                                        ? "Continue your journey with us"
                                        : "Join us and bring your ideas to life"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Toggle between Sign In and Sign Up - Hide during verification */}
                    {signUpStep === "form" && (
                        <div className="flex gap-2 p-1 bg-muted/20 rounded-lg mb-6">
                            <button
                                type="button"
                                onClick={() => setMode("signin")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    mode === "signin"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("signup")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                                    mode === "signup"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}

                    {/* Forms Container */}
                    <div className="relative">
                        {/* Sign In Form */}
                        <div
                            className={`transition-all duration-200 ${
                                mode === "signin" && signUpStep === "form"
                                    ? "opacity-100 visible relative"
                                    : "opacity-0 invisible absolute top-0 left-0 right-0 pointer-events-none"
                            }`}
                        >
                            <SignIn />
                        </div>

                        {/* Sign Up Form */}
                        <div
                            className={`transition-all duration-200 ${
                                mode === "signup" && signUpStep === "form"
                                    ? "opacity-100 visible relative"
                                    : "opacity-0 invisible absolute top-0 left-0 right-0 pointer-events-none"
                            }`}
                        >
                            <SignUp />
                        </div>

                        {/* Email Verification */}
                        <div
                            className={`transition-all duration-200 ${
                                mode === "signup" &&
                                signUpStep === "verification"
                                    ? "opacity-100 visible relative"
                                    : "opacity-0 invisible absolute top-0 left-0 right-0 pointer-events-none"
                            }`}
                        >
                            <EmailVerification
                                email={signUpEmail}
                                onVerify={handleEmailVerification}
                                onBack={handleBackToSignUp}
                                onResend={handleResendCode}
                            />
                        </div>
                    </div>

                    {/* Alternative action link - Hide during verification */}
                    {signUpStep === "form" && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                {mode === "signin"
                                    ? "Don't have an account? "
                                    : "Already have an account? "}
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-primary p-0 h-auto font-medium"
                                    onClick={() => {
                                        setMode(
                                            mode === "signin"
                                                ? "signup"
                                                : "signin",
                                        );
                                        setSignUpStep("form");
                                    }}
                                >
                                    {mode === "signin" ? "Sign up" : "Sign in"}
                                </Button>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel - Image/Illustration */}
            {/*<div className="hidden lg:flex w-1/2 bg-muted/20 items-center justify-center p-12 border-l border-border">
                <div className="w-full max-w-lg">
                    <div className="aspect-square bg-card rounded-2xl border border-border shadow-xl flex items-center justify-center">
                        <div className="text-center p-12">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Box className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                Welcome to EventSync
                            </h3>
                            <p className="text-sm text-muted-foreground mb-8 transition-opacity duration-200">
                                Transform your ideas into reality with our
                                expert team.{" "}
                                {mode === "signin"
                                    ? "Sign in to continue your project journey."
                                    : "Sign up to start your project journey."}
                            </p>
                            <div className="space-y-4 text-left">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-bold text-primary">
                                            1
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Quick Setup
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Get started in minutes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-bold text-primary">
                                            2
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Expert Team
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Matched to your needs
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-bold text-primary">
                                            3
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Quality Results
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Delivered on time
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
        </div>
    );
}
