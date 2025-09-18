"use client";
import { Button } from "@/components/ui/button";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import z from "zod";

const Page = () => {
  const [isSending, setIsSending] = useState(false);
  const params = useParams();
  const username = params.username as string;
  const [messages, setMessages] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSending(true);
    try {
      const payload = {
        ...data,
        username,
      };
      const response = await axios.post<ApiResponse>(
        "/api/send-message",
        payload
      );
      toast.success(response.data.message);
      form.reset();
      setMessages(""); // Clear suggestions after sending
    } catch (error) {
      console.error("Error in sending message:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ??
        "An error occurred while sending message";
      toast.error(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const getAiSuggestion = async () => {
    setIsSuggesting(true);
    try {
      const response = await axios.get("/api/suggest-messages");
      // console.log("response", response);
      setMessages(response.data.completion);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error in getting suggestions:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ??
        "An error occurred while getting suggestions";
      toast.error(errorMessage);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("content", suggestion);
    setMessages(""); // Clear suggestions after selecting one
  };

  const separatedMessages = messages
    .split("||")
    .map((q) => q.trim())
    .filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your message"
                        {...field}
                        className="min-h-[80px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSending || !form.watch("content")}
                  className="flex-1"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* AI Suggestions Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Message Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            onClick={getAiSuggestion}
            disabled={isSuggesting}
            variant="outline"
            className="w-full"
          >
            {isSuggesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Suggestions
              </>
            )}
          </Button>

          {separatedMessages.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">
                Click on any suggestion to use it:
              </p>
              <div className="grid gap-3">
                {separatedMessages.map((message, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(message)}
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer 
                             hover:border-blue-300 hover:bg-blue-50 
                             transition-all duration-200 
                             hover:shadow-md active:scale-[0.98]
                             group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center 
                                    group-hover:bg-blue-200 transition-colors"
                      >
                        <span className="text-xs font-semibold text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isSuggesting &&
            separatedMessages.length === 0 &&
            messages === "" && (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Click Generate AI Suggestions to get message ideas</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
