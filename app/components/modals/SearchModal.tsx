"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from "query-string";
import CountrySelect,{ CountrySelectValue } from "../inputs/CountrySelect";
import { Modal } from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { formatISO } from "date-fns";
import Heading from "../Heading";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false
  }), [location])

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])
  const onSubmit = useCallback(async () => {
    if (step != STEPS.INFO) {
      return onNext()
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      roomCount,
      bathroomCount,
      guestCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: "/",
      query: updatedQuery,
    }, { skipNull: true })
    setStep(STEPS.LOCATION)
    searchModal.onClose();
    router.push(url);
  }, [bathroomCount, dateRange, guestCount, location, onNext, params, roomCount, router, searchModal, step]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }
    return "Next"
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
      title="Where do you want to go"
      subtitle="Find the perfect location"
      />
      <CountrySelect 
      value={location}
      onChange={(value) => setLocation(value as CountrySelectValue)}
      />
    </div>
  )
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
      body={bodyContent}
    />
  );
}

export default SearchModal;
