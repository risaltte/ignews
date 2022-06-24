import Head from 'next/head';
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