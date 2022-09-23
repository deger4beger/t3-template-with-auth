import Head from "next/head";

const PageShell = ({
	children,
	title
}: {
	children: React.ReactNode;
	title: string;
}) => {
	return (
		<>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ title } />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        { children }
      </main>
    </>
	)
}

export default PageShell