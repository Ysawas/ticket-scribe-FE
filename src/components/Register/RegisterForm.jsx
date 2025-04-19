
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { register as registerUser } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import BirthDatePicker from "./BirthDatePicker";
import PasswordField from "./PasswordField";
import { registerSchema } from "@/schemas/registerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: null,
    },
    mode: "onBlur",
  });

  const generateUsername = () => {
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName).toLowerCase();
    }
    return "";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const username = generateUsername();

    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: username,
        email: data.email,
        password: data.password,
        birthDate: data.birthDate,
        role: "user", // Default role
      });
      toast.success("Account created successfully! Please sign in.");
      // Give the user time to see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // Error is handled in the API service
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="family-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={generateUsername()}
            disabled
            className="bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            Username is generated from your name
          </p>
        </FormItem>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <BirthDatePicker
                selectedDate={field.value}
                onDateChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordField
          form={form}
          name="password"
          label="Password"
          autoComplete="new-password"
          showStrengthIndicator={true}
        />

        <PasswordField
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? <LoadingSpinner size="sm" /> : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
