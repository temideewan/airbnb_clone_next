"use client";
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react"
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { Modal } from "./Modal";
import Heading from "../Heading";
import { Input } from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import useGoogleGithub, { googleOrGithub } from "@/app/hooks/usegooglegithubLoader";


export const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal();

  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoadingGithub, isLoadingGoogle, setLoadingGoogleOrGithub } = useGoogleGithub();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in")
        router.refresh();
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }

  const userSignIn = (mode: "github" | 'google') => {
    setLoadingGoogleOrGithub(mode);
    signIn(mode).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in")
        router.refresh();
        loginModal.onClose()
      }
    }).finally(() => {
      setLoadingGoogleOrGithub(null);
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </form>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        isLoading={isLoadingGoogle}
        onClick={() => userSignIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        isLoading={isLoadingGithub}
        onClick={() => userSignIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <p className="">
            First time using Airbnb?
          </p>
          <p onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline ">
            Create an account
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      isCompletingAction={isLoading}
    />
  )
}
