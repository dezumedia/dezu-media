import MobileCarousel from "@/components/custom/mobile-carousel";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import "../styles/content.css";

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function getDataPosts() {
  const res = await fetch(`${apiUrl}/posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = res.json();
  return data;
}

export default async function Home() {
  const { data } = await getDataPosts();

  const content: BlocksContent = data[1].attributes.content;
  return (
    <>
      <main className="desktop-w">
        <MobileCarousel />
        <article className="px-4">
          <BlocksRenderer content={content} />
        </article>
      </main>
    </>
  );
}
