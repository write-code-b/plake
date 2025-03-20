import { MAIN_TAB } from "@/constants/ui";
import { cn } from "@/lib/utils";

interface IMainTabProps {
  onClickTab: (value: string) => void;
  activeMainTabIdx: number;
  setActiveMainTabIdx: React.Dispatch<React.SetStateAction<number>>;
  setActiveSubTabIdx: React.Dispatch<React.SetStateAction<number>>;
}

const MainTab = ({
  onClickTab,
  activeMainTabIdx,
  setActiveMainTabIdx,
  setActiveSubTabIdx,
}: IMainTabProps) => {
  return (
    <div className="mb-6 flex items-center gap-3">
      {MAIN_TAB.map((tab, i) => (
        <button
          key={i}
          onClick={() => {
            onClickTab(tab.value);
            setActiveMainTabIdx(i);
            setActiveSubTabIdx(0);
          }}
          aria-label="메인 주제 탭"
          className="relative"
        >
          <span
            className={cn(
              "pb-1.5 text-lg font-semibold text-gray-400",
              activeMainTabIdx === i &&
                "text-black after:absolute after:mt-1.5 after:block after:w-full after:border-b-2 after:border-gray-900 after:content-['']",
            )}
          >
            {tab.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MainTab;
