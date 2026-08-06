import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "~/lib/supabase";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

type Channel = {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
};

type Message = {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: { display_name: string; avatar_url: string | null };
};

function CommunityPage() {
  const [session, setSession] = useState<any>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authError, setAuthError] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    loadChannels();
  }, [session]);

  useEffect(() => {
    if (!session) return;
    loadMessages();
    const channel = supabase.channel("messages-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `channel_id=eq.${getChannelId()}` },
        (payload: any) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [session, activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChannelId = () => {
    const ch = channels.find((c) => c.slug === activeChannel);
    return ch?.id || "";
  };

  const loadChannels = async () => {
    const { data } = await supabase.from("channels").select("*").order("name");
    if (data) setChannels(data);
  };

  const loadMessages = async () => {
    const chId = getChannelId();
    if (!chId) return;
    const { data } = await supabase
      .from("messages")
      .select("*, profiles:user_id(display_name, avatar_url)")
      .eq("channel_id", chId)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session) return;
    const chId = getChannelId();
    if (!chId) return;

    await supabase.from("messages").insert({
      channel_id: chId,
      user_id: session.user.id,
      content: newMessage.trim(),
    });
    setNewMessage("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: { data: { display_name: authEmail.split("@")[0] } },
        });
        if (error) throw error;
        // Auto-create profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("profiles").upsert({
            id: user.id,
            display_name: authEmail.split("@")[0],
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return <div className="flex min-h-dvh items-center justify-center bg-warm-50"><div className="font-heading text-lg text-warm-700">Loading...</div></div>;
  }

  // Auth screen
  if (!session) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-warm-50 px-6">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm ring-1 ring-warm-200">
          <div className="text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal-50">
              <svg className="size-7 text-teal-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h1 className="mt-4 font-heading text-2xl font-bold text-warm-900">Community Chat</h1>
            <p className="mt-2 font-body text-sm text-warm-700">Sign in to connect with your wellness community</p>
          </div>

          <form onSubmit={handleAuth} className="mt-8 space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-warm-900">Email</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 placeholder-warm-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-warm-900">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-warm-200 bg-white px-4 py-2.5 font-body text-sm text-warm-900 placeholder-warm-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="Min 6 characters"
              />
            </div>
            {authError && (
              <div className="rounded-lg bg-red-50 p-3 font-body text-sm text-red-700">{authError}</div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-teal-700 px-6 py-3 font-body text-sm font-semibold text-white shadow-sm hover:bg-teal-600"
            >
              {authMode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setAuthMode(authMode === "signin" ? "signup" : "signin"); setAuthError(""); }}
              className="font-body text-sm text-teal-700 hover:underline"
            >
              {authMode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="font-body text-sm text-warm-500 hover:text-teal-700">← Back to home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Chat screen
  const activeChannelData = channels.find((c) => c.slug === activeChannel);

  return (
    <div className="flex h-dvh flex-col bg-warm-50">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-warm-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="rounded-lg p-2 text-warm-500 hover:bg-warm-100 hover:text-teal-700 lg:hidden">
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">VC</span>
            <span className="hidden font-heading text-base font-semibold text-warm-900 sm:block">Vitality Compass</span>
          </Link>
          <span className="text-warm-300">/</span>
          <span className="font-heading text-sm font-medium text-warm-700">Community</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="rounded-lg border border-warm-200 px-4 py-2 font-body text-xs font-medium text-warm-700 hover:bg-warm-50">Dashboard</Link>
          <button onClick={handleSignOut} className="rounded-lg border border-warm-200 px-4 py-2 font-body text-xs font-medium text-warm-500 hover:bg-warm-50 hover:text-red-600">Sign out</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${showSidebar ? "flex" : "hidden"} w-64 shrink-0 flex-col border-r border-warm-200 bg-white lg:flex`}>
          <div className="border-b border-warm-200 px-4 py-4">
            <h2 className="font-heading text-sm font-semibold text-warm-900">Channels</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch.slug); setShowSidebar(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  activeChannel === ch.slug
                    ? "bg-teal-50 text-teal-700"
                    : "text-warm-700 hover:bg-warm-50"
                }`}
              >
                <span className="text-base">{ch.icon}</span>
                <span className="font-body text-sm font-medium"># {ch.name}</span>
              </button>
            ))}
          </nav>
          <div className="border-t border-warm-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                {session.user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-xs font-medium text-warm-900">{session.user.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col">
          {/* Channel Header */}
          {activeChannelData && (
            <div className="border-b border-warm-200 bg-white px-6 py-3">
              <h2 className="font-heading text-base font-semibold text-warm-900">
                {activeChannelData.icon} # {activeChannelData.name}
              </h2>
              <p className="font-body text-xs text-warm-500">{activeChannelData.description}</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl">{activeChannelData?.icon || "💬"}</div>
                  <p className="mt-3 font-body text-sm text-warm-500">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                      {msg.profiles?.display_name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-body text-sm font-semibold text-warm-900">
                          {msg.profiles?.display_name || "Community Member"}
                        </span>
                        <span className="font-body text-xs text-warm-400">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-0.5 font-body text-sm text-warm-700">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Composer */}
          <div className="border-t border-warm-200 bg-white px-6 py-4">
            <form onSubmit={sendMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message #${activeChannelData?.name || "channel"}`}
                className="flex-1 rounded-lg border border-warm-200 bg-warm-50 px-4 py-2.5 font-body text-sm text-warm-900 placeholder-warm-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="rounded-lg bg-teal-700 px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}