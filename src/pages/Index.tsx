import Navigation from "@/components/Navigation";
import Map from "@/components/Map";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock,
  MapPin,
  Plus
} from "lucide-react";

const mockIssues = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing traffic issues and potential vehicle damage. Located near the intersection with Oak Avenue.',
    category: 'traffic' as const,
    status: 'pending' as const,
    location: 'Main St & Oak Ave',
    coordinates: [-74.006, 40.7128] as [number, number],
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    reportedBy: 'John Smith',
    reportedAt: '2 hours ago',
    commentsCount: 12,
    likesCount: 8,
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light has been out for a week, making the area unsafe during nighttime hours.',
    category: 'lighting' as const,
    status: 'in_progress' as const,
    location: 'Pine Street',
    coordinates: [-74.008, 40.7148] as [number, number],
    reportedBy: 'Sarah Johnson',
    reportedAt: '1 day ago',
    commentsCount: 5,
    likesCount: 15,
  },
  {
    id: '3',
    title: 'Illegal Dumping Site',
    description: 'Large amount of construction waste dumped illegally behind the community center.',
    category: 'waste' as const,
    status: 'resolved' as const,
    location: 'Community Center',
    coordinates: [-74.004, 40.7108] as [number, number],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    reportedBy: 'Mike Chen',
    reportedAt: '3 days ago',
    commentsCount: 8,
    likesCount: 22,
  },
];

import heroImage from "@/assets/hero-city.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative bg-hero-gradient text-white py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(56, 116, 203, 0.8), rgba(56, 182, 172, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building Better Cities Together
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Report urban issues, track progress, and engage with your community to create positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-civic-blue hover:bg-white/90" asChild>
                <Link to="/report">
                  <Plus className="w-5 h-5 mr-2" />
                  Report an Issue
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MapPin className="w-5 h-5 mr-2" />
                Explore Map
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-civic-blue mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-civic-navy mb-1">1,247</h3>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-status-pending mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-civic-navy mb-1">156</h3>
                <p className="text-sm text-muted-foreground">Pending Issues</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <CheckCircle className="w-8 h-8 text-status-resolved mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-civic-navy mb-1">891</h3>
                <p className="text-sm text-muted-foreground">Resolved Issues</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-civic-teal mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-civic-navy mb-1">3,421</h3>
                <p className="text-sm text-muted-foreground">Active Citizens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] shadow-map">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-civic-navy">Interactive Issue Map</CardTitle>
                  <Badge variant="outline" className="text-civic-blue border-civic-blue">
                    Live Updates
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="h-[500px] rounded-b-lg overflow-hidden">
                  <Map />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Issues Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-civic-navy">Recent Reports</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search issues..."
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {mockIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onViewDetails={(id) => window.location.href = `/issue/${id}`}
                />
              ))}
            </div>

            <Card className="shadow-card bg-civic-light">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-civic-blue mx-auto mb-4" />
                <h3 className="font-semibold text-civic-navy mb-2">Make a Difference</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help improve your community by reporting issues you encounter.
                </p>
                <Button className="w-full bg-civic-gradient hover:opacity-90" asChild>
                  <Link to="/report">
                    <Plus className="w-4 h-4 mr-2" />
                    Report New Issue
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;