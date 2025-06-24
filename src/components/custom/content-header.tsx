import { cn } from "@/lib/utils";

interface ContentHeaderProps {
  title: string;
  className: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = (props) => {
  const { title, className } = props;
  return (
    <header className="flex items-center gap-1 my-3 mx-3 xl:mx-0">
      <h5
        className={cn(
          "whitespace-nowrap text-orange-500 font-semibold text-lg capitalize",
          className
        )}
      >
        {title}
      </h5>
      <span className="block h-0.5 bg-zinc-300 w-full rounded-lg"></span>
    </header>
  );
};

export default ContentHeader;
