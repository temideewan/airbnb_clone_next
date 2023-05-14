"use client";
import useRentModal from "@/app/hooks/useRentModal";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((value) => value - 1);
  }
  const onNext = () => {
    setStep((value) => value + 1);
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    }
  });

  const category = watch('category');
  const location = watch('location');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'CREATE';
    }
    return 'Next';
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={
                (category) => setCustomValue('category', category)
              }
              selected={ category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="
        flex
        flex-col
        gap-8
      ">
        <Heading 
        title="Where is your place located?"  
        subtitle="Help guests find you!"      
        />
        <CountrySelect 
        onChange={(value) => setCustomValue('location', value)}
        value={location}
        />
        <Map />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      onSubmit={onNext}
      body={bodyContent}
    />
  );
}

export default RentModal;
