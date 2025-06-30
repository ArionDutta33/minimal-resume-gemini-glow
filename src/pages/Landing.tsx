
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Sparkles, Brain, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description: "Let AI generate professional summaries and improve your bullet points with smart suggestions."
    },
    {
      icon: Sparkles,
      title: "Smart Templates",
      description: "Choose from 3 carefully designed templates that are ATS-friendly and recruiter-approved."
    },
    {
      icon: Zap,
      title: "Instant Preview",
      description: "See your resume come to life in real-time as you make changes with our live preview."
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download your professional resume as a high-quality PDF ready for job applications."
    },
    {
      icon: Users,
      title: "Job Matching",
      description: "Analyze job descriptions and get keyword suggestions to match your resume perfectly."
    },
    {
      icon: FileText,
      title: "Professional Quality",
      description: "Create resumes that stand out with clean formatting and professional layouts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-amber-600 mr-3" />
              <span className="text-2xl font-bold text-stone-900">AI Resume Builder</span>
            </div>
            <Link to="/builder">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Build Your Perfect Resume with{' '}
            <span className="text-amber-600">AI Power</span>
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Our AI helps you write compelling content, 
            match job requirements, and stand out from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-stone-300 text-stone-700 px-8 py-3 text-lg">
              <FileText className="w-5 h-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with proven resume best practices 
              to help you create standout applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-amber-600 mb-4" />
                  <CardTitle className="text-stone-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-stone-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
              <Brain className="w-5 h-5 mr-2" />
              Build Your Resume Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-amber-600 mr-3" />
            <span className="text-2xl font-bold text-white">AI Resume Builder</span>
          </div>
          <p className="text-stone-400">
            © 2024 AI Resume Builder. All rights reserved. Built with AI to help you succeed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
