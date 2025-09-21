import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "~/components/ui/button";
import { sessions } from "~/lib/config";

export function CurrentSessionButton() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const findCurrentSession = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight

      // Find the session that is currently happening
      const currentSession = sessions.find((session) => {
        if (session.title === "session.break") return false; // Skip breaks

        const [startHour, startMinute] = session.startAt.split(":").map(Number);
        const [endHour, endMinute] = session.endAt.split(":").map(Number);

        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;

        return currentTime >= startTime && currentTime < endTime;
      });

      if (currentSession) {
        // Create a unique ID for the session
        setCurrentSessionId(
          `${currentSession.startAt}-${currentSession.title}`,
        );
      } else {
        setCurrentSessionId(null);
      }
    };

    findCurrentSession();
    // Check every minute
    const interval = setInterval(findCurrentSession, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sessionSection = document.getElementById("agenda");
      if (!sessionSection) return;

      const rect = sessionSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hide button only when session section is prominently visible
      // (more than 60% of viewport height is covered by session section)
      const visibleHeight =
        Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
      const visibilityRatio = visibleHeight / windowHeight;
      const isSessionSectionProminent = visibilityRatio > 0.6;

      setIsVisible(!isSessionSectionProminent);
    };

    // Check on mount and scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCurrentSession = () => {
    if (!currentSessionId) return;

    const element = document.getElementById(`session-${currentSessionId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  if (!currentSessionId || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={scrollToCurrentSession}
        className="shadow-lg hover:shadow-xl transition-shadow animate-bounce"
        size="lg"
      >
        <FormattedMessage
          id="current_session.button"
          defaultMessage="Go to Current Session"
        />
        <ArrowDown />
      </Button>
    </div>
  );
}
