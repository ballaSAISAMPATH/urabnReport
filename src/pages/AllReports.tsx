import { useState } from "react";
import Navigation from "@/components/Navigation";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  Grid3X3,
  List,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  {
    id: '4',
    title: 'Overflowing Trash Bin',
    description: 'Public trash bin near the park entrance is overflowing and attracting pests.',
    category: 'sanitation' as const,
    status: 'pending' as const,
    location: 'Central Park Entrance',
    coordinates: [-74.005, 40.7118] as [number, number],
    reportedBy: 'Emily Davis',
    reportedAt: '4 hours ago',
    commentsCount: 3,
    likesCount: 12,
  },
  {
    id: '5',
    title: 'Damaged Sidewalk',
    description: 'Cracked sidewalk creating tripping hazard for pedestrians.',
    category: 'traffic' as const,
    status: 'in_progress' as const,
    location: 'Elm Street',
    coordinates: [-74.007, 40.7138] as [number, number],
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400&h=300&fit=crop',
    reportedBy: 'Robert Wilson',
    reportedAt: '2 days ago',
    commentsCount: 7,
    likesCount: 18,
  },
  {
    id: '6',
    title: 'Graffiti on Public Building',
    description: 'Inappropriate graffiti on the side of the community center building.',
    category: 'others' as const,
    status: 'resolved' as const,
    location: 'Community Center',
    coordinates: [-74.003, 40.7098] as [number, number],
    reportedBy: 'Lisa Johnson',
    reportedAt: '1 week ago',
    commentsCount: 15,
    likesCount: 30,
  },
];

const AllReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusCounts = {
    all: mockIssues.length,
    pending: mockIssues.filter(i => i.status === 'pending').length,
    in_progress: mockIssues.filter(i => i.status === 'in_progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-civic-light border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-civic-navy mb-2">All Reports</h1>
              <p className="text-muted-foreground">
                Browse and track all civic issues reported by the community
              </p>
            </div>
            <Button className="bg-civic-gradient hover:opacity-90" asChild>
              <Link to="/report">
                <Plus className="w-4 h-4 mr-2" />
                Report New Issue
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-civic-navy">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                    <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                    <SelectItem value="in_progress">In Progress ({statusCounts.in_progress})</SelectItem>
                    <SelectItem value="resolved">Resolved ({statusCounts.resolved})</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="traffic">Traffic & Roads</SelectItem>
                    <SelectItem value="lighting">Street Lighting</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="others">Other Issues</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-civic-blue text-white' : ''}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-civic-blue text-white' : ''}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Tabs */}
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All Issues
              <Badge variant="secondary" className="ml-2">
                {statusCounts.all}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge className="ml-2 bg-status-pending text-white">
                {statusCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress
              <Badge className="ml-2 bg-status-progress text-white">
                {statusCounts.in_progress}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved
              <Badge className="ml-2 bg-status-resolved text-white">
                {statusCounts.resolved}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredIssues.length} of {mockIssues.length} issues
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="most-commented">Most Commented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Issues Grid/List */}
        <div className={`gap-6 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'flex flex-col space-y-4'
        }`}>
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onViewDetails={(id) => window.location.href = `/issue/${id}`}
              />
            ))
          ) : (
            <div className="col-span-full">
              <Card className="shadow-card">
                <CardContent className="p-12 text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-civic-navy mb-2">No Issues Found</h3>
                  <p className="text-muted-foreground mb-6">
                    No issues match your current filters. Try adjusting your search criteria.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('all');
                    setSelectedCategory('all');
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredIssues.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Issues
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReports;