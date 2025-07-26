// "use client";
// import MessageCard from "@/components/MessageCard";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Message } from "@/model/User";
// import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
// import { ApiResponse } from "@/types/ApiResponse";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios, { AxiosError } from "axios";
// import { Loader2, RefreshCcw } from "lucide-react";
// import { User } from "next-auth";
// import { useSession } from "next-auth/react";
// import React, { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const page = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);

//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   };

//   const { data: session } = useSession();

//   const form = useForm({
//     resolver: zodResolver(acceptMessageSchema),
//   });
//   const { register, watch, setValue } = form;

//   const acceptMessages = watch("acceptMessages");

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get<ApiResponse>("/api/accept-messages");
//       setValue("acceptMessages", response.data.isAcceptingMessage as boolean);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(axiosError.response?.data.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [setValue]);

//   const fetchMessages = useCallback(
//     async (refresh: boolean = false) => {
//       setIsLoading(true);
//       setIsSwitchLoading(false);

//       try {
//         const response = await axios.get<ApiResponse>("/api/get-messages");
//         setMessages(response.data.messages || []);
//         if (refresh) {
//           toast.success(response.data.message);
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse>;
//         toast.error(axiosError.response?.data.message);
//       } finally {
//         setIsLoading(false);
//         setIsSwitchLoading(false);
//       }
//     },
//     [setIsLoading, setMessages]
//   );

//   useEffect(() => {
//     if (!session || !session.user) return;
//     fetchMessages();
//     fetchAcceptMessage();
//   }, [session, setValue, fetchAcceptMessage, fetchMessages]);

//   //handle switch change
//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post("/api/accept-messages", {
//         acceptMesssages: !acceptMessages,
//       });

//       setValue("acceptMessages", !acceptMessages);
//       toast.success(response.data.message);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast.error(axiosError.response?.data.message);
//     }
//   };

//   const { username } = session?.user as User;
//   //TODO do more research
//   const baseUrl = `${window.location.protocol}//${window.location.host}`;
//   const profileUrl = `${baseUrl}/u/${username}`;

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(profileUrl);
//       toast.success("Copied to clipboard");
//     } catch (error) {
//       toast.error("Failed to copy to clipboard");
//     }
//   };

//   if (!session || !session.user) {
//     return <div>not authenticated</div>;
//   }

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <div>
//         <h2>Copy Your Unique Link</h2>
//         {""}
//         <div>
//           <input type="text" value={profileUrl} disabled />
//           <Button onClick={copyToClipboard}>Copy</Button>
//         </div>
//       </div>

//       <div>
//         <Switch
//           {...register("acceptMessages")}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span>Accept Messages:{acceptMessages ? "On" : "Off"}</span>
//       </div>

//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? <Loader2 /> : <RefreshCcw />}
//       </Button>
//       <div>
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               //   key={message._id}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default page;
"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
  Loader2,
  RefreshCcw,
  Copy,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage as boolean);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);

      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success(response.data.message);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message);
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  //handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMesssages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-slate-600">
              Please sign in to access your feedback dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { username } = session?.user as User;

  //TODO do more research
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Feedback Dashboard
            </h1>
          </div>
          <p className="text-slate-600">
            Manage your feedback collection and view responses from your
            audience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Share Link Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5 text-blue-600" />
                Share Your Link
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Share this unique link to collect anonymous feedback from anyone
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={profileUrl}
                  disabled
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Message Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                {acceptMessages ? (
                  <ToggleRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-slate-400" />
                )}
                Message Settings
              </h2>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-800">
                    Accept New Messages
                  </p>
                  <p className="text-sm text-slate-600">
                    {acceptMessages
                      ? "Currently accepting feedback"
                      : "Not accepting new feedback"}
                  </p>
                </div>
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="ml-4"
                />
              </div>
              <div
                className={`mt-3 p-3 rounded-lg ${acceptMessages ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
              >
                <p
                  className={`text-sm ${acceptMessages ? "text-green-700" : "text-amber-700"}`}
                >
                  {acceptMessages
                    ? "✓ Your feedback form is active and collecting responses"
                    : "⚠ Your feedback form is paused - no new messages will be received"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              {/* Messages Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      Received Feedback
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {messages.length}{" "}
                      {messages.length === 1 ? "message" : "messages"} collected
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchMessages(true);
                    }}
                    disabled={isLoading}
                    className="border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCcw className="h-4 w-4 mr-2" />
                    )}
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Messages Content */}
              <div className="p-6">
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <MessageCard
                        key={message._id ? String(message._id) : index}
                        message={message}
                        onMessageDelete={handleDeleteMessage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">
                      No feedback yet
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      Share your link to start collecting anonymous feedback
                      from your audience. Messages will appear here once people
                      start responding.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      💡 Tip: Make sure "Accept New Messages" is turned on to
                      receive feedback
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
