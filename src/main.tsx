/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://145fb436d150511e15c8100687079733@o4509058852782080.ingest.us.sentry.io/4509058854354944",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: "67e9a9f4f84f5b0aab08c6c0",
    context: {
      kind: "user",
      key: "example-user-key",
      name: "Sandy",
    },
  });

  // TODO
  // add locating skeleton while LD is loading
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </StrictMode>
  );
})();
