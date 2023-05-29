"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client"
import Image from "next/image";
import { HeartButton } from "../HeartButton";
import { Button } from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
export default function ListingCard({
  data,
  reservation,
  onAction,
  actionLabel,
  currentUser,
  actionId = "",
  disabled,

}: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return;
    onAction?.(actionId)

  }, [actionId, disabled, onAction])

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;

  }, [reservation])
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
    col-span-1
    cursor-pointer
    group
    "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square relative overflow-hidden w-full rounded-xl">
          <Image
            alt="listing"
            fill
            src={data.imageSrc}
            className="object-cover
          h-full
          w-full
          group-hover:scale-110
          transition
          "
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">
              night
            </div>
          )}
        </div>
        {onAction && actionLabel && <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />}
      </div>
    </div>
  )
}
