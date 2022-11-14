import { PrismaClient, Wish } from '@prisma/client';

export class WishContext {
    static db = new PrismaClient();

    static getEntries() {
        return this.db.wish.findMany({ orderBy: [{ Order: 'asc' }] });
    }

    static async addEntry(wish: Wish) {
        return await this.db.wish.create({
            data: {
                ...wish,
            },
        });
    }
}
