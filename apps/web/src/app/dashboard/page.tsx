"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Ticket, School } from "lucide-react";

export default function EventsDashboard() {
    const stats = [
        {
            title: "Upcoming Events",
            value: "12",
            change: "3 added this week",
            icon: Calendar,
        },
        {
            title: "Active Clubs",
            value: "18",
            change: "+2 from last month",
            icon: School,
        },
        {
            title: "Total Registrations",
            value: "342",
            change: "+89 this week",
            icon: Users,
        },
        {
            title: "Today's Events",
            value: "3",
            change: "Runs till 7 PM",
            icon: Ticket,
        },
    ];

    const recentEvents = [
        { id: 1, name: "Tech Talk: AI & Future", club: "Computer Club", attendees: 120 },
        { id: 2, name: "Cultural Night", club: "Arts Club", attendees: 85 },
        { id: 3, name: "Robotics Workshop", club: "Mech Club", attendees: 60 },
        { id: 4, name: "Photography Walk", club: "Media Club", attendees: 42 },
        { id: 5, name: "Startup Pitching", club: "Entrepreneurship Cell", attendees: 90 },
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
                    backgroundSize: '8px 8px, 12px 12px, 16px 16px',
                    backgroundPosition: '0 0, 4px 4px, 8px 8px',
                    imageRendering: 'pixelated'
                }}
            />
    
            {/* Blue Blur Gradient - Bottom Right */}
            <div 
                className="absolute bottom-20 right-20 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full"
            />

            {/* Blue Blur Gradient - Left Side */}
            <div 
                className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-blue-400/10 blur-[90px] rounded-full"
            />

            {/* Content */}
            <div className="relative flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">College Events Dashboard</h2>
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
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Overview Chart */}
                    <Card className="col-span-4 backdrop-blur-sm bg-background/95 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                        <CardHeader>
                            <CardTitle>Monthly Registrations Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                Chart Component (Add recharts or similar)
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Events */}
                    <Card className="col-span-3 backdrop-blur-sm bg-background/95 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                        <CardHeader>
                            <CardTitle>Recent Events</CardTitle>
                            <CardDescription>
                                Latest activities & attendee counts.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {recentEvents.map((event) => (
                                    <div key={event.id} className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                            <span className="text-sm font-medium">
                                                {event.club.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {event.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.club}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            {event.attendees} attendees
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