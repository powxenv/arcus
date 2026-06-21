import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";
import logo from "../assets/logo.svg";
import { Header, Footer } from "../components/layout";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arcus" },
      {
        name: "description",
        content:
          "Arcus — personality assessments that show where you stand and which direction you're heading. Energy, thinking, identity, and time.",
      },
      { property: "og:title", content: "Arcus" },
      {
        property: "og:description",
        content:
          "Personality assessments that show where you stand and which direction you're heading.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: logo },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased bg-background">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
