-- CreateTable
CREATE TABLE "gifs" (
    "id" SERIAL NOT NULL,
    "giphy_id" VARCHAR NOT NULL,
    "comments" JSONB DEFAULT '[]',

    CONSTRAINT "gifs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "giphy_id" VARCHAR NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" REAL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giphy_pkey" ON "gifs"("giphy_id");

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_giphy_id_fkey" FOREIGN KEY ("giphy_id") REFERENCES "gifs"("giphy_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
