import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Shield, User, Lock, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (loginData.email === 'admin@city.com' && loginData.password === 'admin123') {
      toast({
        title: "Welcome, Administrator!",
        description: "Redirecting to admin panel...",
      });
      navigate('/admin');
      return;
    }

    // Simulate regular user login
    toast({
      title: "Login Successful!",
      description: "Welcome back to UrbanReport.",
    });
    navigate('/');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure passwords match.",
        variant: "destructive",
      });
      return;
    }

    // Simulate registration
    toast({
      title: "Account Created!",
      description: "Welcome to UrbanReport. You can now start reporting issues.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur group-hover:bg-white/30 transition-smooth">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">UrbanReport</h1>
              <p className="text-sm text-white/80">Civic Issue Platform</p>
            </div>
          </Link>
        </div>

        <Card className="shadow-civic bg-white/95 backdrop-blur border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-civic-navy">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account or create a new one</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Register</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-civic-gradient hover:opacity-90">
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </form>

                {/* Admin Demo */}
                <div className="mt-6 p-4 bg-civic-light rounded-lg border border-civic-blue/20">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-civic-blue mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-civic-navy text-sm">Admin Demo Access</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Email: <code className="bg-white px-1 rounded">admin@city.com</code><br/>
                        Password: <code className="bg-white px-1 rounded">admin123</code>
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      placeholder="John Smith"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-civic-gradient hover:opacity-90">
                    <User className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-white/80 hover:text-white text-sm transition-smooth">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;