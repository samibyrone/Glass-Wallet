"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowLeft, Building, Mail, Phone, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    description: "",
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    username: "", // Added for registration
    password: "",
    confirmPassword: "",
    terms: false,
    marketing: false
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    // Basic validation for current step before proceeding
    if (step === 1) {
      if (!formData.companyName || !formData.industry || !formData.country) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required company information.",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required contact details.",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    if (!formData.terms) {
      toast({
        title: "Terms Agreement Required",
        description:
          "You must agree to the Terms of Service and Privacy Policy.",
        variant: "destructive"
      });
      return;
    }

    // Basic validation for username not being an email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(formData.username)) {
      toast({
        title: "Invalid Username",
        description: "Username cannot be an email address. Please choose a unique username.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. Redirecting to dashboard...",
        });
        // Add a small delay before redirecting to ensure toast is displayed
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000); // 1 second delay
      } else {
        const data = await response.json();
        console.error("Registration failed response:", data);
        toast({
          title: "Registration Failed",
          description: data.message || `Error: ${response.status} ${response.statusText}` || "Something went wrong.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error (client-side catch):", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors bg-gradient-to-br from-blue-300 to-purple-300 p-3 rounded-3xl'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Home
          </Link>
        </div>

        <Card className='shadow-xl border-1'>
          <CardHeader className='space-y-1 text-center'>
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold'>E</span>
              </div>
              <span className='text-3xl font-bold text-slate-900'>
                Glass Wallet
              </span>
            </div>
            <CardTitle className='text-2xl font-bold'>
              Create Company Account
            </CardTitle>
            <CardDescription>
              Step {step} of 3 -{" "}
              {step === 1
                ? "Company Information"
                : step === 2
                ? "Contact Details"
                : "Account Setup"}
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Progress Bar */}
            <div className='flex items-center space-x-2 mb-6'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i <= step
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        i < step ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2 '>
                    <Label htmlFor='companyName'>Company Name *</Label>
                    <div className='relative'>
                      <Building className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                      <Input
                        id='companyName'
                        placeholder='Enum Technologies'
                        className='pl-10'
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='industry'>Industry *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("industry", value)
                      }
                      value={formData.industry}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select industry' />
                      </SelectTrigger>
                      <SelectContent className='text-black bg-white'>
                        <SelectItem value='fintech'>Fintech</SelectItem>
                        <SelectItem value='ecommerce'>E-commerce</SelectItem>
                        <SelectItem value='gaming'>Gaming</SelectItem>
                        <SelectItem value='marketplace'>Marketplace</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='country'>Country *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("country", value)
                    }
                    value={formData.country}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select country' />
                    </SelectTrigger>
                    <SelectContent className='text-black bg-white'>
                      <SelectItem value='us'>United States</SelectItem>
                      <SelectItem value='uk'>United Kingdom</SelectItem>
                      <SelectItem value='ca'>Canada</SelectItem>
                      <SelectItem value='ng'>Nigeria</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='website'>Company Website</Label>
                  <div className='relative'>
                    <Globe className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='website'
                      placeholder='https://enum.com'
                      className='pl-10'
                      value={formData.website}
                      onChange={handleChange}
                      autoComplete="url"
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Company Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Brief description of your company and use case for Glass Wallet'
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name *</Label>
                    <Input
                      id='firstName'
                      placeholder='John'
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name *</Label>
                    <Input
                      id='lastName'
                      placeholder='Doe'
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Business Email *</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='john@enum.com'
                      className='pl-10'
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone Number *</Label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                    <Input
                      id='phone'
                      placeholder='+1 (555) 123-4567'
                      className='pl-10'
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="CEO, CTO, Product Manager"
                    required
                    value={formData.jobTitle}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="expectedVolume">Expected Monthly Transaction Volume</Label>
                  <Select onValueChange={(value) => handleSelectChange("expectedVolume", value)} value={formData.expectedVolume}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volume range" />
                    </SelectTrigger>
                    <SelectContent className="text-black bg-white">
                      <SelectItem value="0-10k">$0 - $10,000</SelectItem>
                      <SelectItem value="10k-100k">$10,000 - $100,000</SelectItem>
                      <SelectItem value="100k-1m">$100,000 - $1,000,000</SelectItem>
                      <SelectItem value="1m+">$1,000,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            )}

            {step === 3 && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username'>Username *</Label>
                  <Input
                    id='username'
                    placeholder='Choose a username'
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password *</Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Create a strong password'
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                  <p className='text-xs text-slate-500'>
                    Password must be at least 6 characters long.
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm Password *</Label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder='Confirm your password'
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </div>

                <div className='space-y-4 pt-4'>
                  <div className='flex items-start space-x-2'>
                    <input
                      type='checkbox'
                      id='terms'
                      className='mt-1 rounded border-slate-300'
                      required
                      title='I agree to the Terms of Service and Privacy Policy'
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    <Label htmlFor='terms' className='text-sm leading-relaxed'>
                      I agree to the{" "}
                      <Link
                        href='/terms'
                        className='text-blue-600 hover:text-blue-800'
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href='/privacy'
                        className='text-blue-600 hover:text-blue-800'
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className='flex items-start space-x-2'>
                    <input
                      type='checkbox'
                      id='marketing'
                      className='mt-1 rounded border-slate-300'
                      title='I would like to receive product updates and marketing communications'
                      checked={formData.marketing}
                      onChange={handleChange}
                    />
                    <Label
                      htmlFor='marketing'
                      className='text-sm leading-relaxed'
                    >
                      I would like to receive product updates and marketing
                      communications
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <div className='flex justify-between pt-6'>
              {step > 1 && (
                <Button
                  variant='outline'
                  onClick={prevStep}
                  className='hover:bg-purple-400 font-semibold'
                >
                  Previous
                </Button>
              )}

              {step < 3 ? (
                <Button
                  variant='outline'
                  onClick={nextStep}
                  className={
                    step === 1
                      ? "ml-65 bg-black text-white font-bold hover:bg-purple-400 hover:text-black"
                      : "ml-auto font-bold hover:bg-purple-400"
                  }
                  disabled={loading}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant='outline'
                  onClick={handleSubmit}
                  className='ml-auto font-bold hover:bg-purple-400'
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              )}
            </div>

            <div className='text-center text-sm text-slate-600'>
              Already have an account?{" "}
              <Link
                href='/auth/login'
                className='text-blue-600 hover:text-blue-800 font-medium transition-colors'
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}