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

      <nav className="bg-zinc-800 p-3 font-medium text-zinc-50 sticky">
      	<div className="m-auto w-7/12">
	      	<h1 className="text-lg hover:text-emerald-200 cursor-pointer">
		        Schooller
		      </h1>
	      </div>
      </nav>

      <main className="min-w-max min-h-screen bg-zinc-900 text-zinc-50">
        { children }
      </main>

      <footer className="bg-zinc-900 p-3 text-zinc-400 text-sm flex justify-end pr-6">
      	© 2022 Schooller
      </footer>

    </>
	)
}

export default PageShell