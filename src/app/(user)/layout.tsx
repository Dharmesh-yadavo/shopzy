import Navbar from "@/components/user/Navbar";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="">
        <Navbar />
        {children}
      </section>
    </>
  );
}
