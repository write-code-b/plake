"use client";

import { useEffect, useState } from "react";

import MainTab from "@/components/navigations/MainTab";
import SubTab from "@/components/navigations/SubTab";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
// import useParamsStore from "@/stores/useParamsStore";
import { useParamsAction } from "@/stores/useParamsStore";

const FilterTab = () => {
  //const { setParams } = useParamsStore(state => state);
  const setParams = useParamsAction();

  const { setSearchParams, setNewParams } = useCustomSearchParams();
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const [activeMainTabIdx, setActiveMainTabIdx] = useState<number>(0);
  const [activeSubTabIdx, setActiveSubTabIdx] = useState<number>(0);

  const onClickTab = (value: string) => {
    const data = {
      type: value,
    };
    setSearchParams(data);
    if (value) {
      setParams(setNewParams(data, true));
    }
  };

  useEffect(() => {
    if (activeMainTabIdx === 0) setIsOffline(true);
    else setIsOffline(false);
  }, [activeMainTabIdx]);

  return (
    <>
      <MainTab
        onClickTab={value => onClickTab(value)}
        activeMainTabIdx={activeMainTabIdx}
        setActiveSubTabIdx={setActiveSubTabIdx}
        setActiveMainTabIdx={setActiveMainTabIdx}
      />
      <SubTab
        onClickTab={value => onClickTab(value)}
        activeSubTabIdx={activeSubTabIdx}
        setActiveSubTabIdx={setActiveSubTabIdx}
        isOffline={isOffline}
      />
    </>
  );
};

export default FilterTab;
