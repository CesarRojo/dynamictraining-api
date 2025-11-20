/*
  Warnings:

  - Added the required column `attemptId` to the `CompletedSection` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CompletedSection] DROP CONSTRAINT [CompletedSection_playerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[CompletedSection] ADD [attemptId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Attempt] (
    [id] INT NOT NULL IDENTITY(1,1),
    [playerId] INT NOT NULL,
    CONSTRAINT [Attempt_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CompletedSection] ADD CONSTRAINT [CompletedSection_playerId_fkey] FOREIGN KEY ([playerId]) REFERENCES [dbo].[Player]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedSection] ADD CONSTRAINT [CompletedSection_attemptId_fkey] FOREIGN KEY ([attemptId]) REFERENCES [dbo].[Attempt]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attempt] ADD CONSTRAINT [Attempt_playerId_fkey] FOREIGN KEY ([playerId]) REFERENCES [dbo].[Player]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
