import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data:session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);

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
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{__html: post.content}}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href={"/"}>
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

// getStaticPaths só existe em páginas dinamicas que possuem parâmetros 
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            // { params: { slug: 'obtendo-o-status-de-progresso-do-envio-de-dados-com'} }
        ],
        fallback: 'blocking'
    }
}

// Foi escolhido dinamico  - SSR - porque o Statico - SSG não tem como tornar o post privado. 
// Para er um post o usuário precisa estar logado e ser assinante. 
//Por padrao no SSG não tem restrição e as informações são publicas. 
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    // Buscar post pelo parametro slug
    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: response.data.title,
        content: RichText.asHtml(response.data.content.splice(0, 3)), // vai pegar apenas os 3 primeiros itens
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 30, // 30 minutos
    }
}