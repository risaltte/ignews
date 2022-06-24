import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Lorem ipsum dolor sit amet</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non arcu in risus elementum venenatis. In pellentesque ex erat, a blandit risus ultrices vitae.
                        </p>
                    </a>                    
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Lorem ipsum dolor sit amet</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non arcu in risus elementum venenatis. In pellentesque ex erat, a blandit risus ultrices vitae.
                        </p>
                    </a>                    
                    <a href="#">
                        <time>12 de março de 2021</time>
                        <strong>Lorem ipsum dolor sit amet</strong>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non arcu in risus elementum venenatis. In pellentesque ex erat, a blandit risus ultrices vitae.
                        </p>
                    </a>    
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getByType('post', {
        lang: 'pt-BR',
        fetch: ['post.title', 'post.content'],
        pageSize: 100,
    });

    console.log(JSON.stringify(response, null, 2));

    return {
        props: {

        }
    }
}