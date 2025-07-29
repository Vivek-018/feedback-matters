"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/schemas/verifySchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();

  //zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: param.username,
        code: data.code,
      });
      toast.success("Account verified successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error in sign-up of user:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage =
        axiosError.response?.data.message ??
        "An error occurred during verification.";
      toast.error(errorMessage);
    }
  };

  
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="mt-28 max-w-md w-full">
        <div>
          <h1 className="text-2xl font-bold mb-4">Verify Your Account</h1>
          <p>Please enter the verification code sent to your email.</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
