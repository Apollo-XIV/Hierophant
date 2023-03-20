import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


async function authorization({event, resolve}) {
	if (!event.url.pathname.startsWith('/login')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/login');
		}
		await prisma.$connect;
		const res = await prisma.users.findUnique({where: {email: session.user.email},});
		if (!res || res.admin == false) {
			throw redirect(303, '/login');
		}
	}

	return resolve(event)
}



export const handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
			}),
		]
	}),
	authorization
);

