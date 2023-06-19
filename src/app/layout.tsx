import ClientProvider from "./clientProvider"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ClientProvider>{children}</ClientProvider>
}
