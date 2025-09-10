import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    coordinates: [0, 0] as [number, number],
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            coordinates: [position.coords.longitude, position.coords.latitude],
            location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          });
          toast({
            title: "Location captured!",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Submitted!",
        description: "Thank you for reporting this issue. We'll review it shortly.",
      });
      setIsSubmitting(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        coordinates: [0, 0],
        image: null,
      });
      setImagePreview('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-civic-navy mb-4">Report an Issue</h1>
            <p className="text-lg text-muted-foreground">
              Help improve your community by reporting problems that need attention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-civic-navy">Issue Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title *</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select issue category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traffic">Traffic & Roads</SelectItem>
                          <SelectItem value="lighting">Street Lighting</SelectItem>
                          <SelectItem value="sanitation">Sanitation</SelectItem>
                          <SelectItem value="waste">Waste Management</SelectItem>
                          <SelectItem value="others">Other Issues</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the issue..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="location"
                          placeholder="Street address or landmark"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={getCurrentLocation}>
                          <MapPin className="w-4 h-4 mr-2" />
                          Use Current
                        </Button>
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-w-full h-48 mx-auto rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setImagePreview('');
                                setFormData({ ...formData, image: null });
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                Drag and drop or
                                <Label htmlFor="photo" className="text-civic-blue cursor-pointer font-medium ml-1">
                                  click to upload
                                </Label>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        )}
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only" // Use sr-only to hide it accessibly
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-civic-gradient hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Upload className="w-4 h-4 mr-2 animate-spin" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-civic-navy">Reporting Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Before Reporting:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check if the issue was already reported</li>
                      <li>• Ensure it's on public property</li>
                      <li>• Take clear photos if possible</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What to Include:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Exact location details</li>
                      <li>• Clear issue description</li>
                      <li>• Photos showing the problem</li>
                      <li>• Safety concerns if any</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Status Info */}
              <Card className="shadow-card bg-civic-light">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-civic-navy mb-4">What Happens Next?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-status-pending text-white">1</Badge>
                      <span className="text-sm">Report is reviewed within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-status-progress text-white">2</Badge>
                      <span className="text-sm">Issue is assigned to relevant department</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-status-resolved text-white">3</Badge>
                      <span className="text-sm">You'll receive updates on progress</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;