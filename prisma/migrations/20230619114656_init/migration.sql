-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);
