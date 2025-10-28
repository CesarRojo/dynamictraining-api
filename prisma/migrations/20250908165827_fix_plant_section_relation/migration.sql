/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `plantId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Plant] DROP CONSTRAINT [Plant_sectionId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Plant] DROP COLUMN [sectionId];

-- AlterTable
ALTER TABLE [dbo].[Section] ADD [plantId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Section] ADD CONSTRAINT [Section_plantId_fkey] FOREIGN KEY ([plantId]) REFERENCES [dbo].[Plant]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
