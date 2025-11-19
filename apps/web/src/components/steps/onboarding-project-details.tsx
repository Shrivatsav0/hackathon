"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Sparkles, Code, Lightbulb } from "lucide-react";

interface OnboardingProjectDetailsProps {
    formData: {
        services: string[];
        projectTheme: string;
        projectDetails: string;
        budgetUSD: string;
        expectations: string;
        deadline: string;
        additionalNotes: string;
    };
    setFormData: (data: any) => void;
}

export default function OnboardingProjectDetails({
    formData,
    setFormData,
}: OnboardingProjectDetailsProps) {
    const toggleService = (service: string) => {
        setFormData((prev: any) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s: string) => s !== service)
                : [...prev.services, service],
        }));
    };

    const services = [
        { id: "uiux", label: "UI/UX", icon: Palette },
        { id: "design", label: "Design", icon: Sparkles },
        { id: "webdev", label: "Web Dev", icon: Code },
        { id: "consulting", label: "Consulting", icon: Lightbulb },
    ];

    return (
        <div className="space-y-5 animate-in fade-in duration-300">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                    Tell us about your project
                </h2>
                <p className="text-sm text-muted-foreground">
                    Help us understand your vision and requirements
                </p>
            </div>
            <div className="space-y-4">
                {/* Services Selection */}
                <div className="space-y-2">
                    <Label className="text-foreground text-sm font-medium">
                        Services
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => toggleService(service.id)}
                                className={`h-16 px-3 py-2 rounded-lg border transition-all flex flex-col items-center justify-center gap-1 ${
                                    formData.services.includes(service.id)
                                        ? "border-primary bg-primary/10 text-foreground shadow-sm scale-[1.02]"
                                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/20"
                                }`}
                            >
                                <service.icon className="w-5 h-5" />
                                <span className="font-medium text-xs">
                                    {service.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Theme & Details */}
                <div className="space-y-2">
                    <Label
                        htmlFor="projectTheme"
                        className="text-foreground text-sm font-medium"
                    >
                        Project Theme
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                        id="projectTheme"
                        type="text"
                        placeholder="e.g., Modern E-commerce Platform"
                        value={formData.projectTheme}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                projectTheme: e.target.value,
                            })
                        }
                        required
                        className="h-10"
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="projectDetails"
                        className="text-foreground text-sm font-medium"
                    >
                        Description
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Textarea
                        id="projectDetails"
                        placeholder="Describe your project, references, inspiration, and key features..."
                        value={formData.projectDetails}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                projectDetails: e.target.value,
                            })
                        }
                        className="min-h-[80px] resize-none"
                        required
                    />
                </div>

                {/* Budget & Expectations */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label
                            htmlFor="budgetUSD"
                            className="text-foreground text-sm font-medium"
                        >
                            Budget (USD)
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="budgetUSD"
                            type="number"
                            placeholder="5000"
                            value={formData.budgetUSD}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    budgetUSD: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="deadline"
                            className="text-foreground text-sm font-medium"
                        >
                            Deadline
                            <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                            id="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deadline: e.target.value,
                                })
                            }
                            required
                            className="h-10"
                        />
                    </div>
                </div>

                {/* Expectations */}
                <div className="space-y-2">
                    <Label
                        htmlFor="expectations"
                        className="text-foreground text-sm font-medium"
                    >
                        Expectations
                        <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Textarea
                        id="expectations"
                        placeholder="What do you expect? Deliverables, quality standards, etc..."
                        value={formData.expectations}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                expectations: e.target.value,
                            })
                        }
                        className="min-h-[70px] resize-none"
                        required
                    />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                    <Label
                        htmlFor="additionalNotes"
                        className="text-foreground text-sm font-medium"
                    >
                        Notes{" "}
                        <span className="text-muted-foreground text-xs">
                            (Optional)
                        </span>
                    </Label>
                    <Textarea
                        id="additionalNotes"
                        placeholder="Any other information..."
                        value={formData.additionalNotes}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                additionalNotes: e.target.value,
                            })
                        }
                        className="min-h-[60px] resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
