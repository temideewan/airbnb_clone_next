import { useCallback, useMemo, useState } from "react";

export type googleOrGithub = "google"|"github"| null;
const useGoogleGithub = () => {
  const [isLoadingSocial, setIsLoadingSocial] = useState<googleOrGithub>(null);
  const setLoadingGoogleOrGithub = useCallback((mode: googleOrGithub) =>{
    setIsLoadingSocial(mode)
  },[])

  const isLoadingGoogle = useMemo(() => {
    return isLoadingSocial === 'google'
  },[isLoadingSocial])
  const isLoadingGithub = useMemo(() => {
    return isLoadingSocial === 'github'
  },[isLoadingSocial])

  return {
    isLoadingGithub,
    isLoadingGoogle,
    setLoadingGoogleOrGithub
  }
}

export default useGoogleGithub;
