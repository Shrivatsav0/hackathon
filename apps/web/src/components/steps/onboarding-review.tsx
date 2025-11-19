"use client";

import { Clock, Users, ShieldCheck, TrendingUp } from "lucide-react";

export default function OnboardingReview() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    Review period
                </h2>
                <p className="text-muted-foreground">
                    Your project will enter our review and assignment phase
                </p>
            </div>

            <div className="space-y-4">
                <div className="p-6 bg-muted/50 rounded-xl border border-border/50">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-foreground mb-2">
                                What happens next?
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Our team will review your project requirements
                                and match you with the best-suited team member.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-sm font-semibold text-primary">
                                    1
                                </span>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-foreground mb-1">
                                    Review Period: 2-3 Business Days
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                    Our team will carefully review your project
                                    requirements, budget, and timeline.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-sm font-semibold text-primary">
                                    2
                                </span>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-foreground mb-1">
                                    Team Member Assignment
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                    We'll match your project with the most
                                    suitable team member based on expertise and
                                    availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-sm font-semibold text-primary">
                                    3
                                </span>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-foreground mb-1">
                                    Bump Priority (If Needed)
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                    If the review takes longer than expected,
                                    you'll have the option to bump up your
                                    project priority.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-sm font-semibold text-primary">
                                    4
                                </span>
                            </div>
                            <div>
                                <h5 className="text-sm font-medium text-foreground mb-1">
                                    Project Feedback
                                </h5>
                                <p className="text-xs text-muted-foreground">
                                    If the project cannot be accepted as-is,
                                    we'll provide detailed feedback and suggest
                                    a minimum quote or discuss technical
                                    adjustments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-card rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-primary" />
                            <h4 className="text-sm font-medium text-foreground">
                                Expert Matching
                            </h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            We carefully select team members with the right
                            skills for your project
                        </p>
                    </div>

                    <div className="p-4 bg-card rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            <h4 className="text-sm font-medium text-foreground">
                                Quality Assurance
                            </h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Every project goes through our quality review
                            process
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                        <span>
                            You'll receive email updates throughout the review
                            process. We're committed to transparency and timely
                            communication.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
