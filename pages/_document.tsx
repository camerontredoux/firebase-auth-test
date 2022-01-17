import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="font-body bg-[#fcfcfc] px-10">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
