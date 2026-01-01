import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClassNameType } from "@/utils/reactTypes";

interface Props {
  count?: number;
  className?: ClassNameType;
}

export const ArraySkeleton = ({ count = 3, className }: Props) => {
  return (
    <div className=" flex gap-[5.87px] w-full p-[2.935px] rounded-[7.337px]">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-[32px] flex-1  rounded-[5.87px]", className)}
        />
      ))}
    </div>
  );
};
