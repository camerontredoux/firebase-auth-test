import "@/styles/globals.css";
import { AuthProvider } from "@/utils/auth";
import Layout from "@/components/Layout";
import { AppType } from "next/dist/shared/lib/utils";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/backend/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "http://localhost:3000/api/trpc";
    return {
      url,
    };
  },
})(MyApp);
