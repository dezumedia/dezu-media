/* eslint-disable @next/next/no-img-element */
// TODO: buat reusable fetch data api dan perbaiki komponennya agar lebih rapi
import CardArticleLayouts from "@/components/custom/card-article-layouts";
import ContentHeader from "@/components/custom/content-header";
import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AvatarIcon, ClockIcon } from "@radix-ui/react-icons";
import ReactMarkdown from "react-markdown";

const Home = async () => {
  const URL = process.env.URL;
  const token = process.env.ACCESS_TOKEN;

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);
  const format = (date: Date) => date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  const from = format(last7Days); // otomatis: 7 hari lalu
  const to = format(today); // otomatis: hari ini

  async function getNewArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[publishedAt][$between]=${from}&filters[publishedAt][$between]=${to}&populate=*&pagination[limit]=5`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const newArticleData = await getNewArticleData();

  async function getAllArticleData() {
    const res = await fetch(`${URL}/api/articles?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      next: {
        revalidate: 60,
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const allArticleData = await getAllArticleData();

  async function getEntertainArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[category][name][$eq]=entertainment&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const entertainArticleData = await getEntertainArticleData();

  async function getPilihanArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[recommend][$eq]=true&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const pilihanArticleData = await getPilihanArticleData();

  async function getGamesArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[category][name][$eq]=games&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const gamesArticleData = await getGamesArticleData();

  async function getTechArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[category][name][$eq]=technology&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const techArticleData = await getTechArticleData();

  async function getCultureArticleData() {
    const res = await fetch(
      `${URL}/api/articles?filters[category][name][$eq]=culture&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
  const cultureArticleData = await getCultureArticleData();

  return (
    <>
      <Navbar />
      <main className="desktop-w">
        <Carousel
          opts={{ loop: true }}
          className="cursor-grab active:cursor-grabbing select-none w-full"
        >
          <CarouselContent>
            {newArticleData.map((article: any, index: number) => (
              <CarouselItem
                className="pl-1 h-56 md:h-[450px] relative"
                key={index + 1}
              >
                <figure className="w-full h-full relative">
                  <div className="carousel-shadow opacity-70 bottom-0 absolute w-full h-full xl:rounded-lg"></div>
                  <img
                    src={`${URL}${article.thumbnail.url}`}
                    alt={article.title}
                    className="object-cover w-full h-full xl:rounded-lg aspect-video"
                  />
                </figure>
                <div className="absolute bottom-0 px-4 py-4 md:px-5 md:py-5">
                  <Badge className="bg-orange-500 capitalize text-zinc-100 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-500 border-none md:mb-1">
                    {article.category.name}
                  </Badge>
                  <a
                    href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                  >
                    <h1 className="text-zinc-100 font-semibold hover:text-orange-500 duration-100 md:text-xl capitalize">
                      {article.title}
                    </h1>
                  </a>

                  <ReactMarkdown className="text-zinc-300 text-sm font-light mb-1 hidden md:block">
                    {article.content.slice(0, 125).replace(/\*/g, "") + "..."}
                  </ReactMarkdown>

                  <div className="flex items-center gap-2">
                    <time className="flex items-center md:items-start text-zinc-200 capitalize text-xs gap-1 mt-1 font-light">
                      <ClockIcon className="h-[10px] w-[10px] md:h-[15px] md:w-[15px]" />
                      <p className="text-[10px] md:text-xs">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </time>
                    <div className="flex items-center md:items-start text-zinc-200 capitalize text-xs gap-1 mt-1 font-light">
                      <AvatarIcon className="h-[10px] w-[10px] md:h-[15px] md:w-[15px]" />
                      <p className="text-[10px] md:text-xs">
                        {article.author.name}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-5 pt-2">
            <CarouselPrevious className="w-10 rounded-lg" />
            <CarouselNext className="w-10 rounded-lg" />
          </div>
        </Carousel>

        <article className="flex flex-col xl:flex-row xl:flex-wrap">
          <section className="w-full xl:w-[65%]">
            {/* SECTION BERITA TERBARU */}
            <ContentHeader title="berita terbaru" className="px-0" />
            <div className="px-3 xl:px-0">
              {newArticleData.map((article: any, index: number) => (
                <CardArticleLayouts
                  href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                  className="flex items-start flex-row-reverse md:flex-row gap-3 md:gap-5 mb-6"
                  key={index + 1}
                >
                  <CardArticleLayouts.Image
                    src={`${URL}${article.thumbnail.url}`}
                    title={article.title}
                    className="w-full max-w-[37%] h-24 md:max-w-[35%] md:h-44"
                  />
                  <CardArticleLayouts.Title
                    title={article.title}
                    className="flex flex-col gap-0 md:gap-2 md:text-base text-sm capitalize"
                  >
                    <CardArticleLayouts.Info
                      type={article.category.name}
                      time={new Date(article.publishedAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      author={article.author.name}
                    />
                    <CardArticleLayouts.Description
                      className="hidden md:inline"
                      description={
                        article.content.slice(0, 100).replace(/\*/g, "") + "..."
                      }
                    />
                  </CardArticleLayouts.Title>
                </CardArticleLayouts>
              ))}
              <Button className="capitalize w-full" variant="outline">
                load more
              </Button>
            </div>

            {/* SECTION ENTERTAIMENT */}
            <ContentHeader title="entertainment" className="px-0" />
            <Carousel
              className="w-full select-none"
              opts={{
                dragFree: true,
              }}
            >
              <CarouselContent className="mr-3 xl:mr-0">
                {entertainArticleData.map((article: any, index: number) => (
                  <CarouselItem
                    className="basis-10/12 md:basis-[45%] xl:basis-[47%] xl:pl-1 xl:pr-3"
                    key={index + 1}
                  >
                    <CardArticleLayouts
                      href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                      className="mb-6"
                    >
                      <CardArticleLayouts.Image
                        src={`${URL}${article.thumbnail.url}`}
                        title={article.title}
                        className="w-full h-48 md:h-52 object-cover xl:rounded-lg"
                      />
                      <CardArticleLayouts.Title
                        title={article.title}
                        className="flex flex-col gap-1 mt-2 capitalize"
                      >
                        <CardArticleLayouts.Info
                          type={article.category.name}
                          time={new Date(
                            article.publishedAt
                          ).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          author={article.author.name}
                        />
                      </CardArticleLayouts.Title>
                    </CardArticleLayouts>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* SECTION GAME */}
            <ContentHeader title="games" className="px-0" />
            <Carousel
              className="w-full select-none"
              opts={{
                dragFree: true,
              }}
            >
              <CarouselContent className="mr-3 xl:mr-0">
                {gamesArticleData.map((article: any, index: number) => (
                  <CarouselItem
                    className="basis-10/12 md:basis-[45%] xl:basis-[47%] xl:pl-1 xl:pr-3"
                    key={index + 1}
                  >
                    <CardArticleLayouts
                      href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                      className="mb-6"
                    >
                      <CardArticleLayouts.Image
                        src={`${URL}${article.thumbnail.url}`}
                        title={article.title}
                        className="w-full h-48 md:h-52 object-cover xl:rounded-lg"
                      />
                      <CardArticleLayouts.Title
                        title={article.title}
                        className="flex flex-col gap-1 mt-2 capitalize"
                      >
                        <CardArticleLayouts.Info
                          type={article.category.name}
                          time={new Date(
                            article.publishedAt
                          ).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                          author={article.author.name}
                        />
                      </CardArticleLayouts.Title>
                    </CardArticleLayouts>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>

          {/* SIDE PAGE */}
          <section className="w-full xl:w-[35%]">
            {/* SECTION BERITA PILIHAN */}
            <ContentHeader title="berita pilihan" className="lg:pl-10" />
            <div className="px-3 xl:px-0">
              {pilihanArticleData.map((article: any, index: number) => (
                <CardArticleLayouts
                  href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                  className="mb-6 xl:pl-10 flex items-start flex-row-reverse xl:flex-col md:flex-row gap-3 md:gap-5 xl:gap-0"
                  key={index + 1}
                >
                  <CardArticleLayouts.Image
                    src={`${URL}${article.thumbnail.url}`}
                    title={article.title}
                    className="w-full xl:h-48 object-cover xl:rounded-lg max-w-[37%] h-24 md:max-w-[35%] xl:max-w-full md:h-44"
                  />
                  <CardArticleLayouts.Title
                    title={article.title}
                    className="flex flex-col xl:gap-1 mt-2 gap-0 md:gap-2 md:text-base text-sm capitalize"
                  >
                    <CardArticleLayouts.Info
                      type={article.category.name}
                      time={new Date(article.publishedAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      author={article.author.name}
                    />
                    <CardArticleLayouts.Description
                      className="hidden md:inline xl:hidden"
                      description={
                        article.content.slice(0, 100).replace(/\*/g, "") + "..."
                      }
                    />
                  </CardArticleLayouts.Title>
                </CardArticleLayouts>
              ))}
            </div>
          </section>
        </article>
        <article className="w-full xl:max-w-[65%]">
          {/* SECTION CULTURE */}
          <ContentHeader title="culture" className="px-0" />
          <Carousel
            className="w-full select-none"
            opts={{
              dragFree: true,
            }}
          >
            <CarouselContent className="mr-3 xl:mr-0">
              {cultureArticleData.map((article: any, index: number) => (
                <CarouselItem
                  className="basis-10/12 md:basis-[45%] xl:basis-[47%] xl:pl-1 xl:pr-3"
                  key={index + 1}
                >
                  <CardArticleLayouts
                    href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                    className="mb-6"
                  >
                    <CardArticleLayouts.Image
                      src={`${URL}${article.thumbnail.url}`}
                      title={article.title}
                      className="w-full h-48 md:h-52 object-cover xl:rounded-lg"
                    />
                    <CardArticleLayouts.Title
                      title={article.title}
                      className="flex flex-col gap-1 mt-2 capitalize"
                    >
                      <CardArticleLayouts.Info
                        type={article.category.name}
                        time={new Date(article.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        author={article.author.name}
                      />
                    </CardArticleLayouts.Title>
                  </CardArticleLayouts>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* SECTION TECHNOLOGY */}
          <ContentHeader title="technology" className="px-0" />
          <Carousel
            className="w-full select-none"
            opts={{
              dragFree: true,
            }}
          >
            <CarouselContent className="mr-3 xl:mr-0">
              {techArticleData.map((article: any, index: number) => (
                <CarouselItem
                  className="basis-10/12 md:basis-[45%] xl:basis-[47%] xl:pl-1 xl:pr-3"
                  key={index + 1}
                >
                  <CardArticleLayouts
                    href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                    className="mb-6"
                  >
                    <CardArticleLayouts.Image
                      src={`${URL}${article.thumbnail.url}`}
                      title={article.title}
                      className="w-full h-48 md:h-52 object-cover xl:rounded-lg"
                    />
                    <CardArticleLayouts.Title
                      title={article.title}
                      className="flex flex-col gap-1 mt-2 capitalize"
                    >
                      <CardArticleLayouts.Info
                        type={article.category.name}
                        time={new Date(article.publishedAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        author={article.author.name}
                      />
                    </CardArticleLayouts.Title>
                  </CardArticleLayouts>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* SECTION SEMUA BERITA */}
          <ContentHeader title="all news" className="px-0" />
          <div className="px-3 xl:px-0">
            {allArticleData.map((article: any, index: number) => (
              <CardArticleLayouts
                href={`${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
                className="flex items-start flex-row-reverse md:flex-row gap-3 md:gap-5 mb-6"
                key={index + 1}
              >
                <CardArticleLayouts.Image
                  src={`${URL}${article.thumbnail.url}`}
                  title={article.title}
                  className="w-full max-w-[37%] h-24 md:max-w-[35%] md:h-44"
                />
                <CardArticleLayouts.Title
                  title={article.title}
                  className="flex flex-col gap-0 md:gap-2 md:text-base text-sm capitalize"
                >
                  <CardArticleLayouts.Info
                    type={article.category.name}
                    time={new Date(article.publishedAt).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    author={article.author.name}
                  />
                  <CardArticleLayouts.Description
                    className="hidden md:inline"
                    description={
                      article.content.slice(0, 100).replace(/\*/g, "") + "..."
                    }
                  />
                </CardArticleLayouts.Title>
              </CardArticleLayouts>
            ))}
            <Button className="capitalize w-full" variant="outline">
              load more
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default Home;
