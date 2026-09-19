"use client";
import React, { useState } from "react";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "handover" | "trustlink" | "vault" | "variation";
  unread: boolean;
  link: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Digital Handover Checklist Updated",
    detail: "Banksia Homes marked 4 of 5 verification gates complete for 18 Banksia Crescent (TPH-KEN-018). Practical completion scheduled for 24 Sep 2026.",
    time: "15 mins ago",
    type: "handover",
    unread: true,
    link: "/trustlinks/TL-99214-B",
  },
  {
    id: "n-2",
    title: "Client Variation #04 Pending Sign-Off",
    detail: "Variation for Caesarstone kitchen island upgrade (+$1,400 AUD) requires your digital authorization in TrustLink TL-99214-B.",
    time: "1 hour ago",
    type: "variation",
    unread: true,
    link: "/trustlinks/TL-99214-B",
  },
  {
    id: "n-3",
    title: "Electrical Safety Compliance Certificate Deposited",
    detail: "Bright Spark Electrical uploaded Form 4 safety compliance to your permanent Prop ID Vault.",
    time: "Yesterday, 2:40 PM",
    type: "vault",
    unread: false,
    link: "/vault",
  },
  {
    id: "n-4",
    title: "PEXA Settlement Workspace Connected",
    detail: "Chen & Associates Conveyancing opened a TrustLink connection for Title Search & Transfer verification.",
    time: "3 days ago",
    type: "trustlink",
    unread: false,
    link: "/trustlinks/TL-88301-A",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 w-full flex-1">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-verified uppercase tracking-widest mb-1.5">
            Activity & Alerts
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
            Notifications
          </h1>
          <p className="text-sm text-slate-500">
            Real-time updates across your Prop ID, TrustLinks, and builder milestones.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline self-start sm:self-auto"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`border rounded-2xl p-5 shadow-sm transition-all flex items-start gap-4 ${
              n.unread
                ? "bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800/50"
                : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80"
            }`}
          >
            <div className="mt-1 flex-shrink-0">
              {n.unread ? (
                <span className="w-2.5 h-2.5 rounded-full bg-verified block animate-pulse" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 block" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</span>
                <span className="text-[10px] font-mono text-slate-400">• {n.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {n.detail}
              </p>
              <Link
                href={n.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline"
              >
                View in Workspace →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
