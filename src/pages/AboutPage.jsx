function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">About This Starter</h1>
      <p className="text-slate-600">
        This template keeps the setup minimal so you can start building features
        right away.
      </p>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <p>Install dependencies:</p>
        <pre className="mt-2 rounded bg-slate-900 p-3 text-slate-100">
          npm install
        </pre>
        <p className="mt-3">Run dev server:</p>
        <pre className="mt-2 rounded bg-slate-900 p-3 text-slate-100">
          npm run dev
        </pre>
      </div>
    </section>
  );
}

export default AboutPage;
