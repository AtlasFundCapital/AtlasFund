import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24">
      <p className="label">404</p>
      <h1 className="h-display mt-3">This page is off the map</h1>
      <p className="mt-5 max-w-[440px] text-[16px] text-body">The address may have changed, or the page never existed.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn">
          Back home
        </Link>
        <Link href="/blog" className="btn btn-light">
          Read the blog
        </Link>
      </div>
    </section>
  );
}
