// pages/posts/[id].js

import { useRouter } from 'next/router';
import HomeLink from "../HomeLink/HomeRoute"

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Timestamp: {post.timestamp}</p>
<HomeLink />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [...Array(5)].map((_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {timeout : 100000});
  const post = await response.json();

  return {
    props: { post },
    revalidate: 10, 
  };
}
