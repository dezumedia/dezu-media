/* eslint-disable @next/next/no-img-element */
import { AvatarIcon, ClockIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import React from "react";
import Markdown from "react-markdown";

interface CardArticleLayouts extends React.FC<CardProps> {
  Image: React.FC<ImageProps>;
  Title: React.FC<TitleProps>;
  Info: React.FC<InfoProps>;
  Description: React.FC<DescriptionProps>;
}

interface CardProps {
  children: React.ReactNode;
  className: string;
  href: string;
}
interface ImageProps {
  src: string;
  title: string;
  className: string;
}
interface TitleProps {
  title: string;
  children: React.ReactNode;
  className: string;
}
interface InfoProps {
  type: string;
  time: string;
  author: string;
}
interface DescriptionProps {
  description: string;
  className: string;
}

const CardArticleLayouts: CardArticleLayouts = (props) => {
  const { children, className, href } = props;

  return (
    <a href={href}>
      <figure className={className}>{children}</figure>
    </a>
  );
};

const Image: React.FC<ImageProps> = (props) => {
  const { src, title, className } = props;
  return (
    <div className={className}>
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover rounded-md xl:rounded-lg aspect-video"
      />
    </div>
  );
};

const Title: React.FC<TitleProps> = (props) => {
  const { title, children, className } = props;
  return (
    <div className={className}>
      <h1 className="font-semibold hover:text-orange-500 duration-100 md:text-lg">
        {title}
      </h1>
      {children}
    </div>
  );
};

const Info: React.FC<InfoProps> = (props) => {
  const { type, time, author } = props;
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Badge className="hidden md:block bg-orange-500 opacity-80 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-500 border-none capitalize">
        {type}
      </Badge>
      <time className="flex items-center capitalize text-[10px] md:text-xs gap-1 font-light whitespace-nowrap">
        <ClockIcon className="h-[10px] w-[10px] md:h-[15px] md:w-[15px]" />
        <p>{time}</p>
      </time>
      <div className="flex items-center capitalize gap-1 text-[10px] md:text-xs font-light whitespace-nowrap">
        <AvatarIcon className="h-[10px] w-[10px] md:h-[15px] md:w-[15px]" />
        <p>{author}</p>
      </div>
    </div>
  );
};

const Description: React.FC<DescriptionProps> = (props) => {
  const { description, className } = props;
  return (
    <Markdown
      className={`text-sm font-light text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      {description}
    </Markdown>
  );
};

CardArticleLayouts.Image = Image;
CardArticleLayouts.Title = Title;
CardArticleLayouts.Info = Info;
CardArticleLayouts.Description = Description;
export default CardArticleLayouts;
