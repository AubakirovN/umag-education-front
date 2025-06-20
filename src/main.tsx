import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

import { RootRouter } from "./RootRouter";
import { Provider } from "react-redux";
import "./i18n";
import HttpInterceptor from "./HttpInterceptor";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/App.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <HttpInterceptor>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
          theme={{ fontFamily: "Geologica, sans-serif" }}
        >
          <Notifications position="top-center" maw={500} />
          <Suspense>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <RootRouter />
              </PersistGate>
            </Provider>
          </Suspense>
        </MantineProvider>
      </QueryClientProvider>
    </HttpInterceptor>
  // </React.StrictMode>
);
