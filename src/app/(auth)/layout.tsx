const AuthLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <section className='w-full relative'>
        <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-200 bg-[linear-gradient(to_right,#d0d0d0_1px,transparent_1px),linear-gradient(to_bottom,#d0d0d0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <div className="h-screen flex items-center justify-center">
            { children }
        </div>
    </section>
  )
}

export default AuthLayout