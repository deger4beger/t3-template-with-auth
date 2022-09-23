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

      <header>
      	<h1 className="bg-zinc-800 p-3 font-medium text-gray-50">
	        Home page
	      </h1>
      </header>

      <main className="min-w-max min-h-screen bg-zinc-900 text-gray-50">
        { children }
      </main>

      <footer className="bg-zinc-800 p-1 text-gray-400 text-sm border-t-gray-700 border-t-2 flex justify-center">
      	School management, 2022
      </footer>

    </>
	)
}

export default PageShell