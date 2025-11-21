"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    Award,
    Share2,
    Bookmark,
    ArrowLeft,
    Check,
    Mail,
    Phone,
    Globe,
    Heart,
    Star,
    MessageSquare,
} from "lucide-react";
import { getEventById } from "@/lib/data/events";

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Get event data from shared events data
    const event = getEventById(Number(params.id));

    // If event not found, show error
    if (!event) {
        return (
            <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">Event Not Found</h1>
                    <p className="text-muted-foreground">
                        The event you're looking for doesn't exist.
                    </p>
                    <Button onClick={() => router.push("/events" as any)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Events
                    </Button>
                </div>
            </div>
        );
    }

    const handleRegister = () => {
        setIsRegistered(!isRegistered);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleShare = () => {
        // Implement share functionality
        if (navigator.share) {
            navigator.share({
                title: event.name,
                text: event.description,
                url: window.location.href,
            });
        }
    };

    const spotsLeft = event.maxAttendees - event.attendees;
    const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Small Pixel Dots Background */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, rgba(34, 197, 94, 0.5) 0.5px, transparent 0.5px),
                        radial-gradient(circle, rgba(34, 197, 94, 0.4) 0.5px, transparent 0.5px),
                        radial-gradient(circle, rgba(34, 197, 94, 0.3) 0.5px, transparent 0.5px)
                    `,
                    backgroundSize: "8px 8px, 12px 12px, 16px 16px",
                    backgroundPosition: "0 0, 4px 4px, 8px 8px",
                    imageRendering: "pixelated",
                }}
            />

            {/* Blue Blur Gradient - Top Right */}
            <div className="absolute top-20 right-20 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />

            {/* Green Blur Gradient - Left Side */}
            <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-green-400/10 blur-[90px] rounded-full" />

            {/* Content */}
            <div className="relative flex-1 space-y-6 p-8 pt-6">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="backdrop-blur-sm bg-background/95"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Events
                </Button>

                {/* Header Section */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Hero Card */}
                        <Card className="backdrop-blur-sm bg-background/95">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge variant="outline">
                                                {event.category}
                                            </Badge>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                                                <span className="font-medium">
                                                    {event.rating}
                                                </span>
                                                <span className="mx-1">•</span>
                                                <span>
                                                    {event.reviews} reviews
                                                </span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-3xl">
                                            {event.name}
                                        </CardTitle>
                                        <CardDescription className="text-base">
                                            Organized by {event.club}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleSave}
                                            className={
                                                isSaved
                                                    ? "text-red-500 border-red-500"
                                                    : ""
                                            }
                                        >
                                            <Heart
                                                className={`h-4 w-4 ${isSaved ? "fill-red-500" : ""}`}
                                            />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleShare}
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Event Image Placeholder */}
                                <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-border">
                                    <span className="text-muted-foreground text-sm">
                                        Event Banner
                                    </span>
                                </div>

                                {/* Quick Info Grid */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                            <Calendar className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Date
                                            </p>
                                            <p className="font-medium">
                                                {event.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                            <Clock className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Time
                                            </p>
                                            <p className="font-medium">
                                                {event.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                            <MapPin className="h-5 w-5 text-purple-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Location
                                            </p>
                                            <p className="font-medium">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                        <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                            <Users className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Attendees
                                            </p>
                                            <p className="font-medium">
                                                {event.attendees}/
                                                {event.maxAttendees}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Registration Progress
                                        </span>
                                        <span className="font-medium">
                                            {spotsLeft} spots left
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                                            style={{
                                                width: `${attendancePercentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs Section */}
                        <Card className="backdrop-blur-sm bg-background/95">
                            <CardContent className="pt-6">
                                <Tabs defaultValue="about">
                                    <TabsList>
                                        <TabsTrigger value="about">
                                            About
                                        </TabsTrigger>
                                        <TabsTrigger value="schedule">
                                            Schedule
                                        </TabsTrigger>
                                        <TabsTrigger value="speakers">
                                            Speakers
                                        </TabsTrigger>
                                        <TabsTrigger value="reviews">
                                            Reviews
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="about"
                                        className="space-y-6 mt-6"
                                    >
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                About This Event
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {event.longDescription}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Requirements
                                            </h3>
                                            <ul className="space-y-2">
                                                {event.requirements.map(
                                                    (req, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-2"
                                                        >
                                                            <Check className="h-5 w-5 text-green-500 mt-0.5" />
                                                            <span className="text-muted-foreground">
                                                                {req}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                What You'll Get
                                            </h3>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {event.perks.map(
                                                    (perk, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                                                        >
                                                            <Award className="h-4 w-4 text-blue-500" />
                                                            <span className="text-sm">
                                                                {perk}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                Tags
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {event.tags.map(
                                                    (tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="schedule"
                                        className="space-y-4 mt-6"
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Event Schedule
                                        </h3>
                                        <div className="space-y-4">
                                            {event.schedule.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                                                <Clock className="h-5 w-5 text-blue-500" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">
                                                                {item.time}
                                                            </p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.activity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="speakers"
                                        className="space-y-4 mt-6"
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Featured Speakers
                                        </h3>
                                        {event.speakers.length > 0 ? (
                                            <div className="space-y-4">
                                                {event.speakers.map(
                                                    (speaker, index) => (
                                                        <Card
                                                            key={index}
                                                            className="p-4"
                                                        >
                                                            <div className="flex items-start gap-4">
                                                                <Avatar className="h-16 w-16">
                                                                    <AvatarImage
                                                                        src={
                                                                            speaker.avatar
                                                                        }
                                                                    />
                                                                    <AvatarFallback>
                                                                        {speaker.name
                                                                            .split(
                                                                                " ",
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    n,
                                                                                ) =>
                                                                                    n[0],
                                                                            )
                                                                            .join(
                                                                                "",
                                                                            )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1">
                                                                    <h4 className="font-semibold">
                                                                        {
                                                                            speaker.name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {
                                                                            speaker.title
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm mt-2">
                                                                        <span className="font-medium">
                                                                            Topic:
                                                                        </span>{" "}
                                                                        {
                                                                            speaker.topic
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground text-center py-8">
                                                Speaker information coming soon
                                            </p>
                                        )}
                                    </TabsContent>

                                    <TabsContent
                                        value="reviews"
                                        className="space-y-4 mt-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">
                                                Reviews & Ratings
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                                <span className="font-semibold text-lg">
                                                    {event.rating}
                                                </span>
                                                <span className="text-muted-foreground text-sm">
                                                    ({event.reviews} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p>
                                                Reviews will be available after
                                                the event
                                            </p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">
                        {/* Registration Card */}
                        <Card className="backdrop-blur-sm bg-background/95 sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Event Registration
                                </CardTitle>
                                <CardDescription>
                                    {isRegistered
                                        ? "You're registered for this event"
                                        : "Secure your spot now"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isRegistered ? (
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                            <Check className="h-5 w-5" />
                                            <span className="font-medium">
                                                Registration Confirmed
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            Check your email for event details
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">
                                                Entry Fee
                                            </span>
                                            <span className="text-2xl font-bold text-green-600">
                                                Free
                                            </span>
                                        </div>
                                        {spotsLeft <= 10 && (
                                            <p className="text-sm text-orange-600">
                                                ⚠️ Only {spotsLeft} spots
                                                remaining!
                                            </p>
                                        )}
                                    </div>
                                )}

                                <Button
                                    className={`w-full ${
                                        isRegistered
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                                    }`}
                                    onClick={handleRegister}
                                    disabled={!isRegistered && spotsLeft === 0}
                                >
                                    {isRegistered
                                        ? "Cancel Registration"
                                        : spotsLeft === 0
                                          ? "Event Full"
                                          : "Register Now"}
                                </Button>

                                {!isRegistered && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        Registration closes 1 hour before the
                                        event
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Organizer Card */}
                        <Card className="backdrop-blur-sm bg-background/95">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Event Organizer
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-14 w-14">
                                        <AvatarImage
                                            src={event.organizer.avatar}
                                        />
                                        <AvatarFallback>
                                            {event.organizer.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">
                                            {event.organizer.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {event.organizer.role}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a
                                            href={`mailto:${event.organizer.email}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {event.organizer.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{event.organizer.phone}</span>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Contact Organizer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Share Card */}
                        <Card className="backdrop-blur-sm bg-background/95">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Share Event
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    Spread the word about this event
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="flex-1"
                                    >
                                        <Globe className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="flex-1"
                                    >
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="flex-1"
                                        onClick={handleShare}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
