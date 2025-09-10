import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, User, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
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
          
          <Button size="sm" className="bg-civic-gradient hover:opacity-90 transition-smooth" asChild>
            <Link to="/report">
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;