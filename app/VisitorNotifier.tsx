"use client";

import { useEffect } from "react";

export default function VisitorNotifier() {
  useEffect(() => {
    const topic = process.env.NEXT_PUBLIC_NTFY_TOPIC;
    if (!topic || process.env.NODE_ENV !== "production") return;

    const notify = async () => {
      let location = "an unknown location";
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (data?.success !== false) {
          location = [data.city, data.region, data.country].filter(Boolean).join(", ") || location;
        }
      } catch {
        // Geolocation lookup failed; still send the notification below.
      }

      fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        headers: { Title: "New site visitor" },
        body: `Someone opened your portfolio from ${location}`,
      }).catch(() => {});
    };

    notify();
  }, []);

  return null;
}
