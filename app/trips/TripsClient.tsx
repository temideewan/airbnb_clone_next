import { SafeReservations, SafeUser } from "../types";

interface TripsClientProps {
  reservations: SafeReservations[];
  currentUser: SafeUser
}
const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  return (<div>
    My trips
  </div>);
}

export default TripsClient;
