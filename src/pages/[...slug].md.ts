import type { GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await getCollection('docs');
	return docs.map((entry) => ({
		params: { slug: entry.id },
		props: { entry },
	}));
};

export function GET({ props }: { props: { entry: { data: { title: string }; body?: string } } }) {
	const { entry } = props;
	const md = `# ${entry.data.title}\n\n${entry.body ?? ''}`;
	return new Response(md, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
}
