import { WishContext } from '~~/lib/WishContext';

export default defineEventHandler((_) => {
    return WishContext.getEntries();
});
