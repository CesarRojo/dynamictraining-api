/*
  Warnings:

  - A unique constraint covering the columns `[regionId,value]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Data] ADD CONSTRAINT [Data_regionId_value_key] UNIQUE NONCLUSTERED ([regionId], [value]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
