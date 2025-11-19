"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

interface EmailVerificationProps {
    email: string;
    onVerify: (code: string) => void;
    onBack: () => void;
    onResend: () => void;
}

export function EmailVerification({
    email,
    onVerify,
    onBack,
    onResend,
}: EmailVerificationProps) {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) {
            // Handle paste
            const pastedCode = value.slice(0, 6).split("");
            const newCode = [...code];
            pastedCode.forEach((char, i) => {
                if (index + i < 6 && /^\d$/.test(char)) {
                    newCode[index + i] = char;
                }
            });
            setCode(newCode);
            // Focus on the last filled input or the next empty one
            const nextIndex = Math.min(index + pastedCode.length, 5);
            document.getElementById(`code-${nextIndex}`)?.focus();
            return;
        }

        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            document.getElementById(`code-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (verificationCode.length === 6) {
            onVerify(verificationCode);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        await onResend();
        setIsResending(false);
        setCountdown(60);
        setCanResend(false);
    };

    const isCodeComplete = code.every((digit) => digit !== "");

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                    Verify your email
                </h3>
                <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit verification code to
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                    {email}
                </p>
            </div>

            {/* Verification Code Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium text-center block">
                        Enter verification code
                    </Label>
                    <div className="flex gap-2 justify-center">
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={digit}
                                onChange={(e) =>
                                    handleCodeChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-lg font-semibold flex items-center justify-center"
                                autoComplete="off"
                            />
                        ))}
                    </div>
                </div>

                {/* Resend Code */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                        Didn't receive the code?
                    </p>
                    <Button
                        type="button"
                        variant="link"
                        className="text-sm text-primary p-0 h-auto font-medium"
                        onClick={handleResend}
                        disabled={!canResend || isResending}
                    >
                        {isResending
                            ? "Resending..."
                            : canResend
                              ? "Resend code"
                              : `Resend code in ${countdown}s`}
                    </Button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={!isCodeComplete}
                    >
                        Verify email
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to sign up
                    </Button>
                </div>
            </form>

            {/* Helper Text */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground text-center">
                    Check your spam folder if you don't see the email. The code
                    will expire in 10 minutes.
                </p>
            </div>
        </div>
    );
}
