export interface Event {
    id: number;
    name: string;
    club: string;
    category: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    maxAttendees: number;
    description: string;
    longDescription: string;
    image: string;
    organizer: {
        name: string;
        role: string;
        email: string;
        phone: string;
        avatar: string;
    };
    speakers: Array<{
        name: string;
        title: string;
        topic: string;
        avatar?: string;
    }>;
    requirements: string[];
    schedule: Array<{
        time: string;
        activity: string;
    }>;
    perks: string[];
    tags: string[];
    rating: number;
    reviews: number;
}

export const eventsData: Event[] = [
    {
        id: 1,
        name: "Tech Talk: AI & Future",
        club: "Computer Club",
        category: "Technical",
        date: "Dec 22, 2024",
        time: "3:00 PM - 5:00 PM",
        location: "Auditorium Hall",
        attendees: 120,
        maxAttendees: 150,
        description: "Explore the latest trends in AI and machine learning.",
        longDescription:
            "Join us for an immersive deep dive into the world of Artificial Intelligence. This tech talk will feature renowned speakers from leading tech companies who will share their insights on the latest AI developments, including natural language processing, computer vision, and generative AI. Whether you're a beginner or an experienced developer, this session will provide valuable knowledge and networking opportunities.",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "Dr. Sarah Johnson",
            role: "Club Coordinator",
            email: "sarah.j@college.edu",
            phone: "+1 234-567-8900",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [
            {
                name: "John Doe",
                title: "AI Research Lead at TechCorp",
                topic: "Future of Machine Learning",
            },
            {
                name: "Jane Smith",
                title: "Senior ML Engineer at DataAI",
                topic: "Practical AI Applications",
            },
        ],
        requirements: [
            "Basic programming knowledge",
            "Laptop (optional)",
            "Interest in AI and technology",
        ],
        schedule: [
            { time: "3:00 PM", activity: "Registration & Networking" },
            { time: "3:30 PM", activity: "Opening Remarks" },
            { time: "3:45 PM", activity: "Keynote: Future of ML" },
            { time: "4:30 PM", activity: "Panel Discussion" },
            { time: "4:50 PM", activity: "Q&A Session" },
        ],
        perks: [
            "Certificate of Participation",
            "Networking with Industry Experts",
            "Refreshments Provided",
            "Course Material Access",
        ],
        tags: ["AI", "Machine Learning", "Technology", "Career"],
        rating: 4.8,
        reviews: 45,
    },
    {
        id: 2,
        name: "Cultural Night",
        club: "Arts Club",
        category: "Cultural",
        date: "Dec 25, 2024",
        time: "6:00 PM - 9:00 PM",
        location: "Main Ground",
        attendees: 85,
        maxAttendees: 200,
        description: "An evening of music, dance, and cultural performances.",
        longDescription:
            "Experience a vibrant celebration of diverse cultures through music, dance, and art. Our annual Cultural Night brings together talented performers from various backgrounds to showcase their heritage and traditions in a spectacular evening of entertainment. From classical Indian dances to contemporary fusion performances, this event promises to be a visual and auditory feast that celebrates the rich diversity of our campus community.",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "Prof. Michael Chen",
            role: "Arts Club Advisor",
            email: "m.chen@college.edu",
            phone: "+1 234-567-8901",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [],
        requirements: [
            "Enthusiasm for arts and culture",
            "Comfortable seating arrangements",
        ],
        schedule: [
            { time: "6:00 PM", activity: "Gates Open" },
            { time: "6:30 PM", activity: "Opening Performance" },
            { time: "7:00 PM", activity: "Traditional Dance Show" },
            { time: "8:00 PM", activity: "Musical Performance" },
            { time: "8:45 PM", activity: "Closing Ceremony" },
        ],
        perks: [
            "Free Entry",
            "Food Stalls Available",
            "Cultural Exhibition",
            "Photo Opportunities",
        ],
        tags: ["Culture", "Music", "Dance", "Entertainment"],
        rating: 4.9,
        reviews: 78,
    },
    {
        id: 3,
        name: "Robotics Workshop",
        club: "Mech Club",
        category: "Technical",
        date: "Dec 28, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Lab 3",
        attendees: 60,
        maxAttendees: 80,
        description: "Hands-on workshop on building autonomous robots.",
        longDescription:
            "Dive into the exciting world of robotics with our comprehensive hands-on workshop. Learn the fundamentals of robot design, programming, and automation. This full-day workshop covers everything from basic electronics to advanced sensor integration. Participants will work in teams to build and program their own autonomous robots, with guidance from experienced mentors. Perfect for both beginners and those with some experience in robotics.",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "Dr. Rajesh Kumar",
            role: "Mechanical Engineering Head",
            email: "r.kumar@college.edu",
            phone: "+1 234-567-8902",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [
            {
                name: "Alex Martinez",
                title: "Robotics Engineer at AutoTech",
                topic: "Introduction to Autonomous Systems",
            },
        ],
        requirements: [
            "Basic electronics knowledge",
            "Laptop with Arduino IDE installed",
            "Interest in robotics and mechatronics",
        ],
        schedule: [
            { time: "10:00 AM", activity: "Workshop Introduction" },
            { time: "10:30 AM", activity: "Robotics Fundamentals" },
            { time: "12:00 PM", activity: "Lunch Break" },
            { time: "1:00 PM", activity: "Hands-on Robot Building" },
            { time: "3:00 PM", activity: "Testing & Demonstrations" },
        ],
        perks: [
            "Robot Kit Included",
            "Workshop Certificate",
            "Lunch Provided",
            "Project Documentation",
        ],
        tags: ["Robotics", "Engineering", "Workshop", "Hands-on"],
        rating: 4.7,
        reviews: 32,
    },
    {
        id: 4,
        name: "Photography Walk",
        club: "Media Club",
        category: "Arts",
        date: "Jan 2, 2025",
        time: "7:00 AM - 10:00 AM",
        location: "Campus Tour",
        attendees: 42,
        maxAttendees: 50,
        description: "Capture the beauty of campus at sunrise.",
        longDescription:
            "Join fellow photography enthusiasts for a guided morning walk around campus. Learn composition techniques, lighting tips, and creative perspectives from professional photographers. This early morning session takes advantage of the golden hour light to capture stunning images of our beautiful campus. All skill levels welcome - bring your camera, phone, or any device to capture memories.",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "Emma Williams",
            role: "Media Club President",
            email: "e.williams@college.edu",
            phone: "+1 234-567-8903",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [],
        requirements: [
            "Camera or smartphone",
            "Comfortable walking shoes",
            "Early morning enthusiasm",
        ],
        schedule: [
            { time: "7:00 AM", activity: "Meet at Main Gate" },
            { time: "7:15 AM", activity: "Photography Tips Session" },
            { time: "7:45 AM", activity: "Guided Campus Walk" },
            { time: "9:30 AM", activity: "Photo Review & Feedback" },
        ],
        perks: [
            "Professional Photography Tips",
            "Best Shot Featured on Social Media",
            "Coffee & Snacks",
            "Photography Guide PDF",
        ],
        tags: ["Photography", "Arts", "Creative", "Morning"],
        rating: 4.6,
        reviews: 28,
    },
    {
        id: 5,
        name: "Startup Pitching",
        club: "Entrepreneurship Cell",
        category: "Business",
        date: "Jan 5, 2025",
        time: "2:00 PM - 6:00 PM",
        location: "Conference Room",
        attendees: 90,
        maxAttendees: 100,
        description: "Present your startup ideas to investors and mentors.",
        longDescription:
            "Transform your innovative ideas into reality at our Startup Pitching event. Present your business concepts to a panel of experienced investors, successful entrepreneurs, and industry mentors. Get valuable feedback, potential funding opportunities, and networking connections. Whether you have a fully developed business plan or just a brilliant idea, this is your chance to take the first step towards entrepreneurial success.",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "David Lee",
            role: "E-Cell Coordinator",
            email: "d.lee@college.edu",
            phone: "+1 234-567-8904",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [
            {
                name: "Lisa Anderson",
                title: "Venture Capitalist",
                topic: "What Investors Look For",
            },
            {
                name: "Mark Thompson",
                title: "Serial Entrepreneur",
                topic: "Building Successful Startups",
            },
        ],
        requirements: [
            "Prepared pitch deck (optional)",
            "Business idea or concept",
            "Entrepreneurial mindset",
        ],
        schedule: [
            { time: "2:00 PM", activity: "Registration & Networking" },
            { time: "2:30 PM", activity: "Keynote: Startup Essentials" },
            { time: "3:15 PM", activity: "Pitch Presentations" },
            { time: "5:00 PM", activity: "Investor Feedback" },
            { time: "5:45 PM", activity: "Closing & Awards" },
        ],
        perks: [
            "Mentorship Opportunities",
            "Potential Seed Funding",
            "Networking with Investors",
            "Startup Resources Kit",
        ],
        tags: ["Startup", "Business", "Entrepreneurship", "Pitching"],
        rating: 4.8,
        reviews: 56,
    },
    {
        id: 6,
        name: "Sports Tournament",
        club: "Sports Committee",
        category: "Sports",
        date: "Jan 8, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "Sports Complex",
        attendees: 150,
        maxAttendees: 200,
        description: "Annual inter-department sports competition.",
        longDescription:
            "Get ready for an action-packed day of athletic competition! Our annual inter-department sports tournament features multiple sports including basketball, volleyball, cricket, and track events. Teams from various departments will compete for the championship trophy. Whether you're participating or cheering from the sidelines, this event promises excitement, team spirit, and unforgettable memories. All fitness levels welcome!",
        image: "/event-placeholder.jpg",
        organizer: {
            name: "Coach Robert Martinez",
            role: "Sports Coordinator",
            email: "r.martinez@college.edu",
            phone: "+1 234-567-8905",
            avatar: "/avatar-placeholder.jpg",
        },
        speakers: [],
        requirements: [
            "Sports attire and shoes",
            "Water bottle",
            "Team spirit and enthusiasm",
        ],
        schedule: [
            { time: "9:00 AM", activity: "Opening Ceremony" },
            { time: "9:30 AM", activity: "Morning Matches" },
            { time: "12:00 PM", activity: "Lunch Break" },
            { time: "1:00 PM", activity: "Afternoon Matches" },
            { time: "4:30 PM", activity: "Finals & Awards" },
        ],
        perks: [
            "Medals for Winners",
            "Participation Certificates",
            "Sports Merchandise",
            "Free Sports Drinks",
        ],
        tags: ["Sports", "Competition", "Team", "Fitness"],
        rating: 4.9,
        reviews: 92,
    },
];

export function getEventById(id: number): Event | undefined {
    return eventsData.find((event) => event.id === id);
}

export function getEventsByCategory(category: string): Event[] {
    if (category === "all") {
        return eventsData;
    }
    return eventsData.filter((event) => event.category === category);
}

export function searchEvents(query: string): Event[] {
    const lowercaseQuery = query.toLowerCase();
    return eventsData.filter(
        (event) =>
            event.name.toLowerCase().includes(lowercaseQuery) ||
            event.club.toLowerCase().includes(lowercaseQuery) ||
            event.description.toLowerCase().includes(lowercaseQuery) ||
            event.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
}
