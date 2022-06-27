import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import styles from "./post.module.scss";

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{__html: post.content}}
                    />
                </article>
            </main>
        </>
    );
}

// Foi escolhido dinamico  - SSR - porque o Statico - SSG não tem como tornar o post privado. 
// Para er um post o usuário precisa estar logado e ser assinante. 
//Por padrao no SSG não tem restrição e as informações são publicas. 
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });

    // if (!session) {
        
    // }

    const { slug } = params;

    // instanciar client prismic passando a requisição
    const prismic = getPrismicClient(req);

    // buscar post pelo parametro slug
    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: response.data.title,
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        }
    }
}