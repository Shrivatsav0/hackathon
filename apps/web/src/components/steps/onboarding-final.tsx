"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, CheckCircle2 } from "lucide-react";

interface OnboardingFinalProps {
    formData: {
        paymentMethod: "paypal" | "upi";
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        assignedPerson: string;
    };
    setFormData: (data: any) => void;
}

export default function OnboardingFinal({
    formData,
    setFormData,
}: OnboardingFinalProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    Final steps
                </h2>
                <p className="text-muted-foreground">
                    Payment method, agreements, and project confirmation
                </p>
            </div>

            <div className="space-y-5">
                {/* Payment Method */}
                <div className="space-y-3">
                    <Label className="text-foreground text-sm font-medium">
                        Payment Method
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="space-y-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    paymentMethod: "paypal",
                                })
                            }
                            className={`w-full p-4 rounded-lg border transition-all text-left ${
                                formData.paymentMethod === "paypal"
                                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/30"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        formData.paymentMethod === "paypal"
                                            ? "border-primary"
                                            : "border-muted-foreground"
                                    }`}
                                >
                                    {formData.paymentMethod === "paypal" && (
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm mb-0.5">
                                        PayPal
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Invoice will be sent to your email with
                                        specific requests
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    paymentMethod: "upi",
                                })
                            }
                            className={`w-full p-4 rounded-lg border transition-all text-left ${
                                formData.paymentMethod === "upi"
                                    ? "border-primary bg-primary/10 text-foreground shadow-sm"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/30"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        formData.paymentMethod === "upi"
                                            ? "border-primary"
                                            : "border-muted-foreground"
                                    }`}
                                >
                                    {formData.paymentMethod === "upi" && (
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm mb-0.5">
                                        UPI (India)
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Available for India-based clients
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Terms and Agreements */}
                <div className="space-y-3 pt-2">
                    <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-start gap-3 mb-3">
                            <Checkbox
                                id="terms"
                                checked={formData.agreedToTerms}
                                onCheckedChange={(checked) =>
                                    setFormData({
                                        ...formData,
                                        agreedToTerms: checked === true,
                                    })
                                }
                            />
                            <Label
                                htmlFor="terms"
                                className="text-sm cursor-pointer leading-relaxed"
                            >
                                I agree to the{" "}
                                <a
                                    href="/terms"
                                    className="text-primary underline hover:text-primary/80"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of Service
                                </a>
                                <span className="text-destructive ml-1">*</span>
                            </Label>
                        </div>

                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="privacy"
                                checked={formData.agreedToPrivacy}
                                onCheckedChange={(checked) =>
                                    setFormData({
                                        ...formData,
                                        agreedToPrivacy: checked === true,
                                    })
                                }
                            />
                            <Label
                                htmlFor="privacy"
                                className="text-sm cursor-pointer leading-relaxed"
                            >
                                I agree to the{" "}
                                <a
                                    href="/privacy"
                                    className="text-primary underline hover:text-primary/80"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>{" "}
                                and consent to asset transfer
                                <span className="text-destructive ml-1">*</span>
                            </Label>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground px-1">
                        Payment receipt will be generated for both you and the
                        assigned team member
                    </p>
                </div>

                {/* Asset Transfer Info */}
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Required Assets
                    </h4>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Brand logos and guidelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Content and copy materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Images and media files</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>Access credentials (if needed)</span>
                        </li>
                    </ul>
                </div>

                {/* Team Member Preference */}
                <div className="space-y-2 pt-2">
                    <Label
                        htmlFor="assignedPerson"
                        className="text-foreground text-sm font-medium"
                    >
                        Preferred Team Member{" "}
                        <span className="text-muted-foreground text-xs">
                            (Optional)
                        </span>
                    </Label>
                    <Input
                        id="assignedPerson"
                        type="text"
                        placeholder="Enter team member name if you have a preference"
                        value={formData.assignedPerson}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                assignedPerson: e.target.value,
                            })
                        }
                        className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                        If you have a preferred team member, you can request
                        them here
                    </p>
                </div>

                {/* Confirmation Info */}
                <div className="p-5 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                                Ready to begin?
                            </h4>
                            <p className="text-xs text-muted-foreground mb-3">
                                Once you complete this step, we'll:
                            </p>
                            <ul className="space-y-1.5 text-xs text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Review and confirm all project details
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Provide you with a commencement date
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Introduce you to your assigned team
                                        member
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">
                                        ✓
                                    </span>
                                    <span>
                                        Begin the project kickoff process
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
