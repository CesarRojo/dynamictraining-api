/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Region` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Color] ADD CONSTRAINT [Color_color_key] UNIQUE NONCLUSTERED ([color]);

-- CreateIndex
ALTER TABLE [dbo].[Plant] ADD CONSTRAINT [Plant_name_key] UNIQUE NONCLUSTERED ([name]);

-- CreateIndex
ALTER TABLE [dbo].[Plant] ADD CONSTRAINT [Plant_code_key] UNIQUE NONCLUSTERED ([code]);

-- CreateIndex
ALTER TABLE [dbo].[Region] ADD CONSTRAINT [Region_name_key] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
