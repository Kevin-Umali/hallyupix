import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ACRONYM_APP_NAME, APP_NAME } from "@/constant";
import { Link } from "@tanstack/react-router";

interface AuthCardProps {
  children: React.ReactNode;
  sideContent?: {
    title: string;
    description: string;
  };
}

const AuthCard = ({ children, sideContent }: AuthCardProps) => {
  return (
    <div className="min-h-screen bg-secondary/10 flex justify-center items-center p-4 md:p-8">
      <Card className="flex flex-col md:flex-row w-full max-w-[1400px] shadow-lg">
        {/* Left Section */}
        <CardContent className="w-full md:w-[60%] p-6 md:p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <Link to="/">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white text-xl font-bold">{ACRONYM_APP_NAME}</div>
              <span className="text-xl font-semibold">{APP_NAME}</span>
            </Link>
          </div>
          {children}
        </CardContent>

        {/* Right Section */}
        {sideContent && (
          <div className="w-full md:w-[40%] bg-primary text-primary-foreground">
            <CardContent className="h-full p-6 md:p-10 flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-4 max-w-md">
                <CardTitle className="text-2xl font-bold text-primary-foreground">{sideContent.title}</CardTitle>
                <CardDescription className="text-primary-foreground/90 text-base">{sideContent.description}</CardDescription>
              </div>

              <div className="w-full aspect-square max-w-md bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground/60">Illustration</span>
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
};

AuthCard.displayName = "AuthCard";

export default AuthCard;
