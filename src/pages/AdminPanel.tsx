import { useState } from "react";
import Navigation from "@/components/Navigation";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const mockIssues = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing traffic issues and potential vehicle damage.',
    category: 'traffic' as const,
    status: 'pending' as const,
    location: 'Main St & Oak Ave',
    coordinates: [-74.006, 40.7128] as [number, number],
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    reportedBy: 'John Smith',
    reportedAt: '2024-01-15',
    commentsCount: 12,
    likesCount: 8,
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light has been out for a week, making the area unsafe.',
    category: 'lighting' as const,
    status: 'in_progress' as const,
    location: 'Pine Street',
    coordinates: [-74.008, 40.7148] as [number, number],
    reportedBy: 'Sarah Johnson',
    reportedAt: '2024-01-14',
    commentsCount: 5,
    likesCount: 15,
    priority: 'medium' as const,
  },
  {
    id: '3',
    title: 'Illegal Dumping Site',
    description: 'Large amount of construction waste dumped illegally.',
    category: 'waste' as const,
    status: 'resolved' as const,
    location: 'Community Center',
    coordinates: [-74.004, 40.7108] as [number, number],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    reportedBy: 'Mike Chen',
    reportedAt: '2024-01-12',
    commentsCount: 8,
    likesCount: 22,
    priority: 'low' as const,
  },
];

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: mockIssues.length,
    pending: mockIssues.filter(i => i.status === 'pending').length,
    inProgress: mockIssues.filter(i => i.status === 'in_progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-civic-gradient rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-civic-navy">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage civic issues and community reports</p>
            </div>
          </div>
          <Badge variant="outline" className="text-civic-blue border-civic-blue">
            Administrator Access
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Issues</p>
                  <p className="text-2xl font-bold text-civic-navy">{stats.total}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-civic-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-2xl font-bold text-status-pending">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-status-pending" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-status-progress">{stats.inProgress}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-status-progress" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resolved</p>
                  <p className="text-2xl font-bold text-status-resolved">{stats.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-status-resolved" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-civic-navy">Issue Management</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                  <TabsTrigger value="cards">Card View</TabsTrigger>
                </TabsList>
                
                {/* Filters */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search issues..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="traffic">Traffic</SelectItem>
                      <SelectItem value="lighting">Lighting</SelectItem>
                      <SelectItem value="waste">Waste</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="table" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Issue</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{issue.title}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {issue.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {issue.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              issue.status === 'pending' ? 'bg-status-pending' :
                              issue.status === 'in_progress' ? 'bg-status-progress' :
                              'bg-status-resolved'
                            } text-white`}>
                              {issue.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${priorityColors[issue.priority]}`}></div>
                              <span className="capitalize text-sm">{issue.priority}</span>
                            </div>
                          </TableCell>
                          <TableCell>{issue.location}</TableCell>
                          <TableCell>{issue.reportedBy}</TableCell>
                          <TableCell>{issue.reportedAt}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="cards" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onViewDetails={(id) => console.log('View details:', id)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;