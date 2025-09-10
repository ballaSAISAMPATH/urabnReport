import { useState } from "react";
import Navigation from "@/components/Navigation";
import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, User, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  Mail,
} from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

const initialIssues = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing traffic issues and potential vehicle damage.',
    category: 'traffic',
    status: 'pending',
    location: 'Main St & Oak Ave',
    coordinates: [-74.006, 40.7128],
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    reportedBy: 'John Smith',
    reportedAt: '2024-01-15',
    commentsCount: 12,
    likesCount: 8,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light has been out for a week, making the area unsafe.',
    category: 'lighting',
    status: 'in_progress',
    location: 'Pine Street',
    coordinates: [-74.008, 40.7148],
    reportedBy: 'Sarah Johnson',
    reportedAt: '2024-01-14',
    commentsCount: 5,
    likesCount: 15,
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Illegal Dumping Site',
    description: 'Large amount of construction waste dumped illegally.',
    category: 'waste',
    status: 'resolved',
    location: 'Community Center',
    coordinates: [-74.004, 40.7108],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    reportedBy: 'Mike Chen',
    reportedAt: '2024-01-12',
    commentsCount: 8,
    likesCount: 22,
    priority: 'low',
  },
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    reportedBy: 'Guest User',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      reportedBy: 'Guest User',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>File a New Report</DialogTitle>
          <DialogDescription>
            Fill in the details of the civic issue you've encountered.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select onValueChange={handleCategoryChange} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traffic">Traffic</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="waste">Waste</SelectItem>
                  <SelectItem value="sanitation">Sanitation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" value={formData.location} onChange={handleChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AdminPanel = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { toast } = useToast();

  const sendEmailNotification = async (issue, newStatus) => {
    try {
      console.log('Sending email notification:', { issue: issue.id, newStatus });
      toast({
        title: "Email Sent",
        description: `Notification sent to ${issue.reportedBy} about status update to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email notification",
        variant: "destructive",
      });
    }
  };

  const handleStatusUpdate = async (issueId, newStatus) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
    const issue = issues.find(i => i.id === issueId);
    if (issue) {
      await sendEmailNotification(issue, newStatus);
      toast({
        title: "Status Updated",
        description: `Issue #${issueId} status updated to ${newStatus}`,
      });
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = filteredIssues.map(issue => ({
        ID: issue.id,
        Title: issue.title,
        Description: issue.description,
        Category: issue.category,
        Status: issue.status,
        Location: issue.location,
        'Reported By': issue.reportedBy,
        'Reported Date': issue.reportedAt,
        Priority: issue.priority,
        Comments: issue.commentsCount,
        Likes: issue.likesCount,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Issues');

      XLSX.writeFile(workbook, `civic_issues_${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "Export Successful",
        description: "Issues exported to Excel file successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export issues to Excel",
        variant: "destructive",
      });
    }
  };

const handleViewIssue = (id: string) => {
    window.location.href = `/issue/${id}`;
  };


  const handleEditIssue = (id) => {
    toast({
      title: "Edit Functionality",
      description: `A modal for editing issue #${id} would open here.`,
    });
  };

  const handleDeleteIssue = (id) => {
    setIssues(prevIssues => prevIssues.filter(issue => issue.id !== id));
    toast({
      title: "Issue Deleted",
      description: `Issue #${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleNewReport = (newIssueData) => {
    const newIssue = {
      id: (issues.length + 1).toString(),
      ...newIssueData,
      status: 'pending',
      reportedAt: new Date().toISOString().split('T')[0],
      coordinates: [-74.007, 40.713],
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      commentsCount: 0,
      likesCount: 0,
      priority: 'medium',
    };
    setIssues(prevIssues => [...prevIssues, newIssue]);
    toast({
      title: "Report Submitted",
      description: `Your report has been successfully submitted!`,
    });
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-civic-gradient">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-civic-navy">UrbanReport</h1>
              <p className="text-xs text-muted-foreground">Civic Issue Platform</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-civic-blue transition-smooth">
              Map View
            </Link>
            <Link to="/reports" className="text-sm font-medium text-muted-foreground hover:text-civic-blue transition-smooth">
              All Reports
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-civic-blue transition-smooth">
              Admin Panel
            </Link>
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-civic-blue transition-smooth">
              Login
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-civic-blue text-xs text-white p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>

            <Button
              size="sm"
              className="bg-civic-gradient hover:opacity-90 transition-smooth"
              onClick={() => setIsReportModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

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
                <Button variant="outline" size="sm" onClick={exportToExcel}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
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
                            <div className="flex items-center space-x-2">
                              <Badge className={`${
                                issue.status === 'pending' ? 'bg-status-pending' :
                                  issue.status === 'in_progress' ? 'bg-status-progress' :
                                    'bg-status-resolved'
                                } text-white`}>
                                {issue.status.replace('_', ' ')}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newStatus = issue.status === 'pending' ? 'in_progress' :
                                    issue.status === 'in_progress' ? 'resolved' : 'pending';
                                  handleStatusUpdate(issue.id, newStatus);
                                }}
                                className="h-6 text-xs"
                              >
                                <Mail className="w-3 h-3" />
                              </Button>
                            </div>
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
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewIssue(issue.id)}
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditIssue(issue.id)}
                                title="Edit Issue"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteIssue(issue.id)}
                                title="Delete Issue"
                              >
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
                      onViewDetails={() => handleViewIssue(issue.id)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleNewReport}
      />
    </div>
  );
};

export default AdminPanel;