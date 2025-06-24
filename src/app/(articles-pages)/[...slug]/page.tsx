/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/custom/navbar";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import style from "../../../styles/markdown-styles.module.css";
import rehypeRaw from "rehype-raw";
import Footer from "@/components/custom/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardArticleLayouts from "@/components/custom/card-article-layouts";
import ContentHeader from "@/components/custom/content-header";

interface DetailArticleProps {
  params: {
    slug: string[];
  };
}
const DetailArticle: React.FC<DetailArticleProps> = async (props) => {
  const { params } = props;

  const URL = process.env.URL;
  const token = process.env.ACCESS_TOKEN;

  async function getDetailArticleData() {
    const res = await fetch(
      `${URL}/api/articles/${params.slug[2]}?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch article data");
    }
  }

  async function getArticlesData() {
    const res = await fetch(`${URL}/api/articles/?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    } else {
      throw new Error("Failed to fetch all articles data");
    }
  }

  const [detailArticleData, articlesData] = await Promise.all([
    getDetailArticleData(),
    getArticlesData(),
  ]);

  return (
    <>
      <Navbar />
      <main className="desktop-w">
        <article className="flex flex-col xl:flex-row xl:flex-wrap">
          <section className="w-full xl:w-[65%] px-3 xl:px-0 relative">
            <img
              src={`${URL}${detailArticleData.thumbnail.url}`}
              alt={`image-${detailArticleData.title}`}
              className="w-full rounded-lg aspect-video object-cover mt-5"
            />
            <Badge className="bg-orange-500 text-zinc-100 hover:bg-orange-500 dark:bg-orange-500 dark:hover:bg-orange-500 border-none md:mb-2 mt-3">
              {detailArticleData.category.name}
            </Badge>
            <h1 className="capitalize text-3xl font-bold mb-5 dark:text-zinc-100">
              {detailArticleData.title}
            </h1>
            <ReactMarkdown
              className={style.reactMarkDown}
              rehypePlugins={[rehypeRaw]}
            >
              {detailArticleData.content}
            </ReactMarkdown>

            <h1 className="text-xl font-semibold mb-2">Penulis</h1>
            <div className="bg-orange-500 py-3 px-3 rounded-lg flex items-center text-zinc-50 gap-3">
              <img
                className="h-auto w-14 rounded-full"
                src="/images/profile.webp"
                alt=""
              />
              <div>
                <h3 className="text-xl font-semibold capitalize">
                  {detailArticleData.author.name}
                </h3>
                <p>{detailArticleData.author.bio}</p>
              </div>
            </div>

            <ContentHeader
              title="baca artikel lainnya"
              className="px-0 -ml-3 xl:-mx-0"
            />
            <Carousel
              className="w-full select-none"
              opts={{
                dragFree: true,
              }}
            >
              <CarouselContent className="mr-3 xl:mr-0 -ml-3 xl:ml-0">
                {articlesData.map((article: any, index: number) => (
                  <CarouselItem
                    className="basis-10/12 md:basis-[45%] xl:basis-[47%] xl:pl-1 xl:pr-3"
                    key={index + 1}
                  >
                    <CardArticleLayouts
                      href={`/${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
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

          <section className="w-full xl:w-[35%]">
            {/* SECTION BERITA TERBARU */}
            <ContentHeader title="berita terbaru" className="lg:pl-10" />
            <div className="px-3 xl:px-0">
              {articlesData.map((article: any, index: number) => (
                <CardArticleLayouts
                  href={`/${article.category.slug}/${article.sub_category.slug}/${article.documentId}/${article.slug}`}
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
      </main>

      <main>
        <article></article>
      </main>
      <Footer />
    </>
  );
};

export default DetailArticle;
