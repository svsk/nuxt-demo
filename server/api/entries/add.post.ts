import { Wish } from '@prisma/client';
import { WishContext } from '~~/lib/WishContext';

export default defineEventHandler(async (event) => {
    const wish = await useBody<Wish>(event);

    const addedWish = WishContext.addEntry(wish);

    return addedWish;
});
