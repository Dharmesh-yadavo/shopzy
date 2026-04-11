"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, ChevronLeft, Sparkles, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { markAsRead, sendMessageAction } from "@/features/chat/chat.action";

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: Date;
}

interface SupportUser {
  id: string;
  name: string;
  image?: string;
  role?: "user" | "vendor" | "admin";
  chat: {
    id: string;
    updatedAt: Date;
    lastMessageText: string | null;
    unreadCount: number;
    lastMessageBy: string | null;
  };
}

interface ChatClientProps {
  supportUsers: SupportUser[];
  currentUserId: string;
}

export default function ChatClient({
  supportUsers,
  currentUserId,
}: ChatClientProps) {
  const [activeUser, setActiveUser] = useState<SupportUser | null>(null);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // scroll part for messages
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [newMessages, chatHistory, isLoading]);

  // fetching old messages
  useEffect(() => {
    const fetchHistory = async () => {
      if (!activeUser) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/chat/history?participantId=${activeUser.id}`,
        );
        const data = await response.json();
        setChatHistory(data);
        setNewMessages([]);
      } catch (error) {
        console.error("Failed to load history", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [activeUser]);

  // Submiting the message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeUser) return;

    const currentText = message;
    setMessage("");

    const optimisticMsg: Message = {
      id: Date.now().toString(),
      text: currentText,
      senderId: currentUserId,
      createdAt: new Date(),
    };

    setNewMessages((prev) => [...prev, optimisticMsg]);

    // Save to Database
    const result = await sendMessageAction(
      currentUserId,
      activeUser.id,
      currentText,
    );

    if (!result.success) {
      console.error(result.error);
    }
  };

  // First chat (sorting users):
  const finalSupportUsers = supportUsers.sort((a, b) => {
    const timeA = a.chat?.updatedAt ? new Date(a.chat.updatedAt).getTime() : 0;
    const timeB = b.chat?.updatedAt ? new Date(b.chat.updatedAt).getTime() : 0;

    const hasUnreadA = (a.chat?.unreadCount ?? 0) > 0 ? 1 : 0;
    const hasUnreadB = (b.chat?.unreadCount ?? 0) > 0 ? 1 : 0;

    if (hasUnreadA !== hasUnreadB) {
      return hasUnreadB - hasUnreadA;
    }

    return timeB - timeA;
  });

  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden font-sans">
      {/* --- SIDEBAR --- */}
      <aside
        className={`w-full md:w-80 border-r border-zinc-800 flex flex-col bg-black transition-all ${
          activeUser ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            Inbox
          </h1>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {finalSupportUsers?.map((user) => {
              const hasNotification =
                user.chat?.lastMessageBy !== currentUserId &&
                user.chat?.unreadCount > 0;

              console.log("USER: ", user);

              return (
                <button
                  key={user.id}
                  onClick={() => {
                    setActiveUser(user);
                    if (hasNotification) markAsRead(user.chat.id); // Clear dot on click
                  }}
                  className="relative w-full p-3 flex items-center gap-3 ..."
                >
                  <Avatar className="h-12 w-12 border border-zinc-700">
                    <AvatarImage
                      src={user.image}
                      alt={user.name}
                      className="p-0.5 object-cover rounded-4xl"
                    />

                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-left">
                    <span className="font-semibold block">{user.name}</span>
                    {user.role === "admin" && (
                      <p className="text-[9px] pt-0.5 font-black  uppercase  text-amber-400 leading-none">
                        {user.role}
                      </p>
                    )}
                  </div>

                  {/* THE NOTIFICATION DOT */}
                  {hasNotification && (
                    <div className="absolute right-4 flex items-center justify-center">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </aside>

      {/* --- MAIN CHAT WINDOW --- */}
      <section
        className={`flex-1 flex flex-col relative ${!activeUser ? "hidden md:flex" : "flex"}`}
      >
        {activeUser ? (
          <>
            {/* Header */}
            <header className="h-20 flex items-center justify-between px-6 border-b border-zinc-800 bg-black/50 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-400"
                  onClick={() => setActiveUser(null)}
                >
                  <ChevronLeft />
                </Button>
                <Avatar className="h-10 w-10 border border-zinc-800">
                  <AvatarImage
                    src={activeUser.image}
                    className="p-0.5 object-cover rounded-4xl"
                  />
                  <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-sm font-bold">{activeUser.name}</h2>
                </div>
              </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Messages Content */}
              <ScrollArea className="flex-1 bg-[#050505] p-6">
                <div className="max-w-3xl mx-auto space-y-10">
                  {/* History Section */}
                  <div className="space-y-6">
                    {isLoading ? (
                      <p className="text-center text-xs text-zinc-600 animate-pulse">
                        Loading conversation...
                      </p>
                    ) : (
                      chatHistory.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-3 ${msg.senderId === currentUserId ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`p-4 rounded-2xl text-sm max-w-[85%] border ${
                              msg.senderId === currentUserId
                                ? "bg-blue-600 border-transparent text-white rounded-br-none"
                                : "bg-zinc-900 border-zinc-800 text-zinc-200 rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* New Messages Section */}
                  <div className="space-y-4">
                    {newMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="flex flex-col items-end gap-1"
                      >
                        <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-xl shadow-blue-900/10 max-w-[85%] text-sm">
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-zinc-600 mr-1">
                          Sent
                        </span>
                      </div>
                    ))}
                    <div
                      title="scroll-anchor"
                      ref={scrollEndRef}
                      className="h-2"
                    />
                  </div>
                </div>
              </ScrollArea>

              {/* Right Column: AI Co-Pilot */}
              <aside className="w-full lg:w-72 border-l border-zinc-800 bg-black p-6 space-y-6">
                <div className="flex items-center gap-2 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="text-[11px] font-black uppercase tracking-tighter">
                    AI Co-Pilot
                  </h3>
                </div>

                <div className="space-y-2">
                  {[
                    "Where is my order?",
                    "Is there a discount?",
                    "Refund policy details",
                  ].map((text, i) => (
                    <button
                      key={i}
                      className="w-full text-left p-3 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:border-zinc-500 hover:text-white transition-all duration-200"
                    >
                      {text}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <p className="text-[10px] text-zinc-500 leading-tight">
                    AI is analyzing this conversation to provide relevant
                    shortcuts.
                  </p>
                </div>
              </aside>
            </div>

            {/* --- INPUT BAR --- */}
            <footer className="p-6 bg-black border-t border-zinc-800">
              <form
                onSubmit={handleSendMessage}
                className="max-w-4xl mx-auto relative flex items-center"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message..."
                  className="h-14 bg-zinc-900/50 border-zinc-800 rounded-2xl px-6 pr-16 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-500 transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#020202]">
            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
              <Bot className="w-10 h-10 text-zinc-700" />
            </div>
            <h3 className="text-zinc-400 font-medium">
              Select a contact to start
            </h3>
            <p className="text-zinc-600 text-xs">
              Your secure messages are end-to-end encrypted.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
