import { useDiscord } from '~~/lib/Discord';

export default defineNuxtPlugin(async () => {
    if (!process.server) return;
    useDiscord();
});
