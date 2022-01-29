import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { AuthProvider } from "@/utils/auth";
import { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
