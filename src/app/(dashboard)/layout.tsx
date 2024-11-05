import Navbar from "@/components/dashboard/Navbar"

const DashBoardLayout = ({ children } : { children : React.ReactNode}) => {
    return (
        <>
            <Navbar/>
            <div>
                { children }
            </div>
        </>
      )
}
export default DashBoardLayout