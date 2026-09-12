-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "productUrl" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "marketplace" TEXT NOT NULL DEFAULT 'SHOPEE',
    "affiliateUrl" TEXT,
    "trackingId" TEXT,
    "shopeeItemId" TEXT,
    "shopeeShopId" TEXT,
    "affiliateGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_products" ("active", "categoryId", "createdAt", "description", "id", "name", "price", "productUrl", "stock", "storeId", "updatedAt", "userId") SELECT "active", "categoryId", "createdAt", "description", "id", "name", "price", "productUrl", "stock", "storeId", "updatedAt", "userId" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_trackingId_key" ON "products"("trackingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
