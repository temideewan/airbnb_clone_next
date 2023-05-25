import { Listing, Reservation, User } from "@prisma/client"

interface ListingCardProp {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User;
}
export default function ListingCard() {
  return (
    <div>ListingCard</div>
  )
}
