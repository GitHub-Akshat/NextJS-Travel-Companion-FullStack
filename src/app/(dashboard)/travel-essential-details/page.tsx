import Travel from "@/components/dashboard/travel"
import { Suspense } from "react"

const TravelEssentialDetails = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div><Travel/></div>
    </Suspense>
  )
}
export default TravelEssentialDetails