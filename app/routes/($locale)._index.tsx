import { useIntl } from "react-intl";
import { CurrentSessionButton } from "~/components/current-session-button";
import { HeroSection } from "~/components/index/hero-section";
import { SessionsSection } from "~/components/index/sessions-section";

export default function Index() {
  const intl = useIntl();

  return (
    <>
      <title>{intl.formatMessage({ id: "meta.title" })}</title>
      <meta
        name="description"
        content={intl.formatMessage({ id: "meta.description" })}
      />
      <HeroSection />
      <SessionsSection />
      <CurrentSessionButton />
    </>
  );
}
