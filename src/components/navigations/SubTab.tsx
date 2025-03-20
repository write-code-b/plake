import { Button } from "@/components/ui/Button";
import { SUB_TAB } from "@/constants/ui";
import { cn } from "@/lib/utils";

interface ISubTabProps {
  onClickTab: (value: string) => void;
  activeSubTabIdx: number;
  setActiveSubTabIdx: React.Dispatch<React.SetStateAction<number>>;
  isOffline: boolean;
}

const SubTab = ({
  onClickTab,
  isOffline,
  activeSubTabIdx,
  setActiveSubTabIdx,
}: ISubTabProps) => {
  return (
    <div className="align-center mb-6 flex gap-2">
      {SUB_TAB[isOffline ? "OFFLINE" : "ONLINE"].map((tab, i) => (
        <Button
          key={i}
          variant="default"
          aria-label="서브 주제 탭"
          className={cn(
            "rounded-xl px-4 py-2.5",
            activeSubTabIdx !== i &&
              "bg-gray-200 text-black hover:bg-gray-200/90",
          )}
          onClick={() => {
            onClickTab(tab.value);
            setActiveSubTabIdx(i);
          }}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
};

export default SubTab;
