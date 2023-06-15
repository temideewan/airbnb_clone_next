"use client"
import { PuffLoader } from "react-spinners"
interface LoaderProps {
  useOtherLoader?: boolean
}
const Loader: React.FC<LoaderProps> = ({
  useOtherLoader
}) => {
  return (
    <div className=" h-[70vh] flex flex-col justify-center items-center">
      {useOtherLoader ? <PuffLoader size={100} color="green" />:<PuffLoader size={100} color="red" />}
    </div>
  )
}

export default Loader;
