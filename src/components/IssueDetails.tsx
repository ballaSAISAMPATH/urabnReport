import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  User,
  MessageCircle,
  ThumbsUp,
  Share,
  Flag,
  Camera,
  Send,
  Heart,
  Eye,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface IssueDetailsProps {
  issue: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'pending' | 'in_progress' | 'resolved';
    location: string;
    coordinates: [number, number];
    imageUrl?: string;
    reportedBy: string;
    reportedAt: string;
    commentsCount: number;
    likesCount: number;
  };
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    content: 'I saw the city crew inspecting this yesterday. Hopefully they fix it soon!',
    timestamp: '2 hours ago',
    likes: 5,
  },
  {
    id: '2',
    author: 'Mike Chen',
    content: 'This is a serious safety hazard. My car tire got damaged last week.',
    timestamp: '5 hours ago',
    likes: 12,
  },
  {
    id: '3',
    author: 'Admin',
    content: 'Update: This issue has been assigned to the Public Works department. Expected resolution within 7-10 business days.',
    timestamp: '1 day ago',
    likes: 8,
  },
];

const statusColors = {
  pending: 'bg-status-pending text-white',
  in_progress: 'bg-status-progress text-white',
  resolved: 'bg-status-resolved text-white',
};

const statusLabels = {
  pending: 'Pending Review',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

const IssueDetails = ({ issue }: IssueDetailsProps) => {
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(issue.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Here you would normally submit the comment to your backend
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Issue Card */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge className={statusColors[issue.status]}>
                  {statusLabels[issue.status]}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {issue.category}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-civic-navy mb-2">{issue.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {issue.location}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {issue.reportedAt}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Reported by {issue.reportedBy}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Issue Image */}
          {issue.imageUrl && (
            <div className="relative">
              <img
                src={issue.imageUrl}
                alt="Issue"
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3">
                <Camera className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-civic-navy mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`hover:bg-red-50 hover:text-red-600 ${isLiked ? 'text-red-600' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {likesCount}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                {mockComments.length}
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                {Math.floor(Math.random() * 100) + 50}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center text-civic-navy">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments ({mockComments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <Textarea
              placeholder="Add your comment or update..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Be respectful and constructive in your comments
              </p>
              <Button type="submit" disabled={!newComment.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4">
            {mockComments.map((comment, index) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-civic-light text-civic-navy text-xs">
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-sm text-civic-navy">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      {comment.author === 'Admin' && (
                        <Badge className="bg-civic-blue text-white text-xs">Official</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                    <div className="flex items-center space-x-4 pt-1">
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
                {index < mockComments.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetails;