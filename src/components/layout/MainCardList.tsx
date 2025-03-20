"use client";

import { useEffect } from "react";

import { useGatheringList } from "@/hooks/gathering/useGatheringList";
import { useParams } from "@/stores/useParamsStore";

import MainCardItem from "./MainCardItem";

const MainCardList = () => {
  const params = useParams();

  const { data } = useGatheringList(params);

  useEffect(() => {
    console.log("MainCardLIst", params);
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {data?.pages.map((page, pageNum) =>
        page.map(card => (
          <MainCardItem
            key={card.id}
            id={card.id}
            name={card.name}
            dateTime={new Date(card.dateTime)}
            registrationEnd={new Date(card.registrationEnd)}
            location={card.location}
            participantCount={card.participantCount}
            capacity={card.capacity}
            image={card.image}
            firstPage={pageNum === 0}
          />
        )),
      )}
    </div>
  );
};

export default MainCardList;
