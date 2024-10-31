const AuthLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <section className="w-full bg-neutral-100">
        <div className="h-screen flex items-center justify-center">
            { children }
        </div>
    </section>
  )
}

export default AuthLayout