"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import OnboardingBasicInfo from "@/components/steps/onboarding-basic-info";
import OnboardingProjectDetails from "@/components/steps/onboarding-project-details";
import OnboardingReview from "@/components/steps/onboarding-review";
import OnboardingFinal from "@/components/steps/onboarding-final";

const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Project" },
    { id: 3, name: "Review" },
    { id: 4, name: "Final" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        companyType: "",
        businessModel: "" as "solo" | "agency" | "company",
        referralCode: "",
        services: [] as string[],
        projectTheme: "",
        projectDetails: "",
        budgetUSD: "",
        expectations: "",
        deadline: "",
        additionalNotes: "",
        paymentMethod: "" as "paypal" | "upi",
        agreedToTerms: false,
        agreedToPrivacy: false,
        assignedPerson: "",
    });

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return (
                    formData.email &&
                    formData.firstName &&
                    formData.lastName &&
                    formData.companyName &&
                    formData.companyType &&
                    formData.businessModel
                );
            case 2:
                return (
                    formData.services.length > 0 &&
                    formData.projectTheme &&
                    formData.projectDetails &&
                    formData.budgetUSD &&
                    formData.expectations &&
                    formData.deadline
                );
            case 3:
                return true;
            case 4:
                return (
                    formData.paymentMethod &&
                    formData.agreedToTerms &&
                    formData.agreedToPrivacy
                );
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
        router.push("/dashboard");
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <OnboardingBasicInfo
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 2:
                return (
                    <OnboardingProjectDetails
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case 3:
                return <OnboardingReview />;
            case 4:
                return (
                    <OnboardingFinal
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            default:
                return null;
        }
    };

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <Card>
                    <CardContent className="p-8 sm:p-12">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold mb-1">
                                {steps[currentStep - 1].name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Step {currentStep} of {steps.length}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-10">
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            key={currentStep}
                            className="mb-10 animate-in fade-in duration-300"
                        >
                            {renderStepContent()}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between gap-4">
                            {currentStep > 1 ? (
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={handleBack}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Button>
                            ) : (
                                <div />
                            )}

                            <Button
                                size="lg"
                                onClick={handleNext}
                                disabled={!canProceed()}
                            >
                                {currentStep === steps.length
                                    ? "Complete"
                                    : "Continue"}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
