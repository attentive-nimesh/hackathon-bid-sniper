import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import classes from "./styles.module.css";

export default function LoginPage() {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 ${classes["background-div"]}`}
    >
      <Card className="w-full max-w-sm shadow-lg backdrop-blur-sm bg-black/30 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-white">
            Welcome to Bid sniper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 w-full gap-2">
              <TabsTrigger
                value="login"
                className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white rounded-md transition"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="bg-white text-black data-[state=active]:bg-blue-700 data-[state=active]:text-white rounded-md transition"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
