import Image from "next/image";

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 h-full items-center justify-center">
      <div className="flex items-center justify-center">{children}</div>
      <div className="hidden lg:flex lg:bg-slate-300 h-full justify-center items-center lg:flex-col">
        <Image src="/logo.svg" alt="Logo rental cars" width={200} height={200} />
        <h1>Inka Rent</h1>
      </div>
    </div>
  )
}