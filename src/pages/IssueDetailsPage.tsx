import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import IssueDetails from "@/components/IssueDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = mockIssues.find(issue => issue.id === id);

  if (!issue) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-civic-navy mb-4">Issue Not Found</h1>
          <Button onClick={() => navigate('/reports')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <IssueDetails issue={issue} />
      </div>
    </div>
  );
};

export default IssueDetailsPage;