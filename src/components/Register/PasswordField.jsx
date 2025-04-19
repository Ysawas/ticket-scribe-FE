
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, CheckIcon, XIcon } from "lucide-react";
import { 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";

const PasswordField = ({ 
  form, 
  name, 
  label, 
  placeholder = "••••••••", 
  autoComplete,
  showStrengthIndicator = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false
  });
  
  // Calculate password strength when the password changes
  useEffect(() => {
    if (showStrengthIndicator) {
      const password = form.watch(name) || "";
      
      // Check requirements
      const meetsMinLength = password.length >= 6;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      setRequirements({
        minLength: meetsMinLength,
        hasUppercase: hasUpperCase,
        hasNumber: hasNumber
      });
      
      // Calculate strength (simple calculation - can be enhanced)
      let newStrength = 0;
      if (password.length > 0) newStrength += 20;
      if (meetsMinLength) newStrength += 20;
      if (hasUpperCase) newStrength += 20;
      if (hasNumber) newStrength += 20;
      if (password.length > 10) newStrength += 20;
      
      setStrength(newStrength);
    }
  }, [form.watch(name), showStrengthIndicator]);
  
  // Get color based on strength
  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-6 w-6 px-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          <FormMessage />
          
          {showStrengthIndicator && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <Progress value={strength} className="h-2" indicatorClassName={getStrengthColor()} />
                <span className="ml-2 text-xs">
                  {strength < 40 && "Weak"}
                  {strength >= 40 && strength < 70 && "Good"}
                  {strength >= 70 && "Strong"}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  {requirements.minLength ? 
                    <CheckIcon className="h-3 w-3 mr-2 text-green-500" /> : 
                    <XIcon className="h-3 w-3 mr-2 text-red-500" />}
                  At least 6 characters
                </div>
                <div className="flex items-center text-xs">
                  {requirements.hasUppercase ? 
                    <CheckIcon className="h-3 w-3 mr-2 text-green-500" /> : 
                    <XIcon className="h-3 w-3 mr-2 text-red-500" />}
                  At least one uppercase letter
                </div>
                <div className="flex items-center text-xs">
                  {requirements.hasNumber ? 
                    <CheckIcon className="h-3 w-3 mr-2 text-green-500" /> : 
                    <XIcon className="h-3 w-3 mr-2 text-red-500" />}
                  At least one number
                </div>
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default PasswordField;
