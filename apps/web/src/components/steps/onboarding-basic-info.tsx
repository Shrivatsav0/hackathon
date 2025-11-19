"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OnboardingBasicInfoProps {
    formData: {
        email: string;
        firstName: string;
        lastName: string;
        companyName: string;
        companyType: string;
        businessModel: "solo" | "agency" | "company";
        referralCode: string;
    };
    setFormData: (data: any) => void;
}

export default function OnboardingBasicInfo({
    formData,
    setFormData,
}: OnboardingBasicInfoProps) {
    return (
        <div className="space-y-5 animate-in fade-in duration-300">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                    Let's get to know you
                </h2>
                <p className="text-sm text-muted-foreground">
                    Basic information to set up your account
                </p>
            </div>

            <div className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="text-foreground text-sm font-medium"
                    >
                        Email Address
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        required
                        className="h-10"
                    />
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="firstName"
                            className="text-foreground text-sm font-medium"
                        >
                            First Name
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="lastName"
                            className="text-foreground text-sm font-medium"
                        >
                            Last Name
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>
                </div>

                {/* Company Details */}
                <div className="space-y-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="companyName"
                            className="text-foreground text-sm font-medium"
                        >
                            Company Name
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="companyName"
                            type="text"
                            placeholder="Acme Inc."
                            value={formData.companyName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    companyName: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="companyType"
                            className="text-foreground text-sm font-medium"
                        >
                            Industry
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="companyType"
                            type="text"
                            placeholder="e.g., Technology, Consulting"
                            value={formData.companyType}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    companyType: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                            Business Model
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        businessModel: "solo",
                                    })
                                }
                                className={`h-10 px-2 rounded-lg border transition-all ${
                                    formData.businessModel === "solo"
                                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/20"
                                }`}
                            >
                                <div className="font-medium text-sm">Solo</div>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        businessModel: "agency",
                                    })
                                }
                                className={`h-10 px-2 rounded-lg border transition-all ${
                                    formData.businessModel === "agency"
                                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/20"
                                }`}
                            >
                                <div className="font-medium text-sm">
                                    Agency
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        businessModel: "company",
                                    })
                                }
                                className={`h-10 px-2 rounded-lg border transition-all ${
                                    formData.businessModel === "company"
                                        ? "border-primary bg-primary/10 text-foreground shadow-sm"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/20"
                                }`}
                            >
                                <div className="font-medium text-sm">
                                    Company
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Referral Code */}
                <div className="space-y-2">
                    <Label
                        htmlFor="referralCode"
                        className="text-foreground text-sm font-medium"
                    >
                        Referral Code{" "}
                        <span className="text-muted-foreground text-xs">
                            (Optional)
                        </span>
                    </Label>
                    <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code"
                        value={formData.referralCode}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                referralCode: e.target.value,
                            })
                        }
                        className="h-10"
                    />
                </div>
            </div>
        </div>
    );
}
