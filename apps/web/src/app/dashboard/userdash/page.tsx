"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Star } from "lucide-react";

export default function UserDashboard() {
    const stats = [
        {
            title: "Events Registered",
            value: "8",
            change: "2 this week",
            icon: Calendar,
        },
        {
            title: "Events Attended",
            value: "5",
            change: "1 pending feedback",
            icon: CheckCircle,
        },
        {
            title: "Upcoming Events",
            value: "3",
            change: "Next: Tomorrow",
            icon: Clock,
        },
        {
            title: "Points Earned",
            value: "450",
            change: "+50 this week",
            icon: Star,
        },
    ];

    const upcomingEvents = [
        {
            id: 1,
            name: "Tech Talk: AI & Future",
            club: "Computer Club",
            date: "Tomorrow, 3 PM",
            status: "Registered",
        },
        {
            id: 2,
            name: "Cultural Night",
            club: "Arts Club",
            date: "Dec 25, 6 PM",
            status: "Registered",
        },
        {
            id: 3,
            name: "Robotics Workshop",
            club: "Mech Club",
            date: "Dec 28, 10 AM",
            status: "Registered",
        },
    ];

    const recentActivity = [
        {
            id: 1,
            event: "Photography Walk",
            action: "Attended",
            points: "+30",
            date: "2 days ago",
        },
        {
            id: 2,
            event: "Startup Pitching",
            action: "Registered",
            points: "+10",
            date: "3 days ago",
        },
        {
            id: 3,
            event: "Hackathon 2024",
            action: "Attended",
            points: "+50",
            date: "1 week ago",
        },
    ];

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

            {/* Blue Blur Gradient - Bottom Right */}
            <div className="absolute bottom-20 right-20 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />

            {/* Blue Blur Gradient - Left Side */}
            <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-blue-400/10 blur-[90px] rounded-full" />

            {/* Content */}
            <div className="relative flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        My Dashboard
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card
                                key={stat.title}
                                className="backdrop-blur-sm bg-background/95 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.change}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Upcoming Events */}
                    <Card className="col-span-4 backdrop-blur-sm bg-background/95 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>
                                Events you're registered for
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {upcomingEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center"
                                    >
                                        <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div className="ml-4 space-y-1 flex-1">
                                            <p className="text-sm font-medium leading-none">
                                                {event.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.club} • {event.date}
                                            </p>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="col-span-3 backdrop-blur-sm bg-background/95 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Your event participation history
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center"
                                    >
                                        <div className="ml-4 space-y-1 flex-1">
                                            <p className="text-sm font-medium leading-none">
                                                {activity.event}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.action} • {activity.date}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-green-500">
                                            {activity.points}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}