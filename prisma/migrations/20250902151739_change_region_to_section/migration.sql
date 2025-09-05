/*
  Warnings:

  - You are about to drop the column `regionId` on the `Data` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sectionId,value]` on the table `Data` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sectionId` to the `Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Data] DROP CONSTRAINT [Data_regionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Plant] DROP CONSTRAINT [Plant_regionId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Data] DROP CONSTRAINT [Data_regionId_value_key];

-- AlterTable
ALTER TABLE [dbo].[Data] DROP COLUMN [regionId];
ALTER TABLE [dbo].[Data] ADD [sectionId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Plant] DROP COLUMN [regionId];
ALTER TABLE [dbo].[Plant] ADD [sectionId] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[Region];

-- CreateTable
CREATE TABLE [dbo].[Section] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Section_status_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Section_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Section_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Section_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateIndex
ALTER TABLE [dbo].[Data] ADD CONSTRAINT [Data_sectionId_value_key] UNIQUE NONCLUSTERED ([sectionId], [value]);

-- AddForeignKey
ALTER TABLE [dbo].[Plant] ADD CONSTRAINT [Plant_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[Section]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Data] ADD CONSTRAINT [Data_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[Section]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
