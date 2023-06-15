import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>

        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app">
          {children}
        </div>

      </body>
    </html>
  )
}

export default RootLayout;
