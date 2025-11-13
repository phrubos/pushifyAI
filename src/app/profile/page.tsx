"use client";

import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditDisplay } from "@/components/plushify/credit-display";
import { mockUser, mockPurchases } from "@/lib/mock-data";
import { Mail, Calendar, User, Shield, ArrowLeft, CreditCard, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  const user = session.user;
  const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Your Profile</h1>
      </div>

      <div className="grid gap-6">
        {/* Profile Overview Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User"}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="text-lg">
                  {(
                    user.name?.[0] ||
                    user.email?.[0] ||
                    "U"
                  ).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                  {user.emailVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {createdDate && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {createdDate}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <div className="p-3 border rounded-md bg-muted/10">
                  {user.name || "Not provided"}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <div className="p-3 border rounded-md bg-muted/10 flex items-center justify-between">
                  <span>{user.email}</span>
                  {user.emailVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Email address verification status
                    </p>
                  </div>
                  <Badge variant={user.emailVerified ? "default" : "secondary"}>
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground">
                      Your account access level
                    </p>
                  </div>
                  <Badge variant="outline">Standard</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your subscription plan and benefits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold capitalize">{mockUser.plan} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {mockUser.plan === "basic" && "Perfect for getting started"}
                  {mockUser.plan === "pro" && "Great for regular users"}
                  {mockUser.plan === "elite" && "Maximum value and features"}
                </p>
              </div>
              <Badge variant="default" className="capitalize">
                {mockUser.plan}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Plan Benefits:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ HD quality generations</li>
                <li>✓ Unlimited gallery storage</li>
                <li>✓ All style options</li>
                {(mockUser.plan === "pro" || mockUser.plan === "elite") && (
                  <li>✓ Priority support</li>
                )}
              </ul>
            </div>
            <div className="flex gap-2">
              {mockUser.plan !== "elite" && (
                <Button asChild>
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/pricing">Change Plan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Credit Information */}
        <Card>
          <CardHeader>
            <CardTitle>Credits</CardTitle>
            <CardDescription>
              Your current credit balance and usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <div className="mt-1">
                  <CreditDisplay credits={mockUser.credits} size="lg" />
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Used This Month</p>
                <p className="text-2xl font-bold mt-1">15</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Total Generated</p>
                <p className="text-2xl font-bold mt-1">42</p>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/pricing">Buy More Credits</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Purchase History */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
            <CardDescription>
              Your recent credit purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPurchases.slice(0, 5).map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{purchase.plan}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(purchase.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${purchase.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {purchase.credits} credits
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4" disabled>
                <User className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Edit Profile</div>
                  <div className="text-xs text-muted-foreground">Update your information</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4" disabled>
                <Shield className="h-4 w-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Security Settings</div>
                  <div className="text-xs text-muted-foreground">Manage security options</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <Link href="/pricing">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Upgrade Plan</div>
                    <div className="text-xs text-muted-foreground">Get more credits</div>
                  </div>
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Additional profile management features coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}