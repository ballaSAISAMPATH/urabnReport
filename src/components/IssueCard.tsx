import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MapPin, 
  Clock, 
  MessageCircle, 
  Camera, 
  Car, 
  Lightbulb, 
  Trash2, 
  AlertCircle,
  ThumbsUp
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'traffic' | 'sanitation' | 'lighting' | 'waste' | 'others';
  status: 'pending' | 'in_progress' | 'resolved';
  location: string;
  coordinates: [number, number];
  imageUrl?: string;
  reportedBy: string;
  reportedAt: string;
  commentsCount: number;
  likesCount: number;
}

interface IssueCardProps {
  issue: Issue;
  onViewDetails?: (id: string) => void;
}

const categoryIcons = {
  traffic: Car,
  sanitation: Trash2,
  lighting: Lightbulb,
  waste: Trash2,
  others: AlertCircle,
};

const statusColors = {
  pending: 'bg-status-pending text-white',
  in_progress: 'bg-status-progress text-white',
  resolved: 'bg-status-resolved text-white',
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

const IssueCard = ({ issue, onViewDetails }: IssueCardProps) => {
  const CategoryIcon = categoryIcons[issue.category];

  return (
    <Card className="shadow-card hover:shadow-civic transition-smooth cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-civic-light rounded-lg">
              <CategoryIcon className="h-4 w-4 text-civic-blue" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-civic-navy group-hover:text-civic-blue transition-smooth line-clamp-1">
                {issue.title}
              </h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {issue.location}
              </div>
            </div>
          </div>
          <Badge className={statusColors[issue.status]}>
            {statusLabels[issue.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {issue.description}
        </p>

        {issue.imageUrl && (
          <div className="relative mb-3">
            <img
              src={issue.imageUrl}
              alt="Issue"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <Camera className="h-4 w-4 text-white drop-shadow-lg" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback className="text-xs bg-civic-light text-civic-navy">
                  {issue.reportedBy.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>By {issue.reportedBy}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {issue.reportedAt}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-civic-light/50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              {issue.commentsCount} comments
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1" />
              {issue.likesCount} likes
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-civic-blue hover:text-civic-navy hover:bg-civic-blue/10"
            onClick={() => onViewDetails?.(issue.id)}
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;