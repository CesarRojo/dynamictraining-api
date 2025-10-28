/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,colorId]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Data] ADD CONSTRAINT [Data_sectionId_colorId_key] UNIQUE NONCLUSTERED ([sectionId], [colorId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
