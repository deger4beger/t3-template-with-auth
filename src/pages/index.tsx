import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "123" }])
  const test = trpc.useQuery(["example.test", { test: 123 }])

  return (
    <>
      <Head>
        <title>t3-school</title>
        <meta name="description" content="t3-school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        { test.data?.test }
      </main>
    </>
  );
};

export default Home;