"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AppShell } from '@/components/Layout/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating user with data:', formData);
    router.push('/dashboard/users');
  };

  return (
    <AppShell>

    <div className="p-4 m-20">
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>Fill out the form below to create a new user.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                />
            </div>
            <Button type="submit" className='bg-green-300 text-black'>Create User</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </AppShell>
  );
}
