/*
  Warnings:

  - You are about to drop the column `firsrName` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "firsrName",
ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "backgroundImg" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "profileImg" TEXT;
