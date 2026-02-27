BEGIN TRY

BEGIN TRAN;

-- AlterTable
EXEC SP_RENAME N'dbo.Image_pkey', N'Response_pkey';
ALTER TABLE [dbo].[Response] ADD [grpId] INT,
[response1] NVARCHAR(1000),
[response2] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Game] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [time] NVARCHAR(1000) NOT NULL,
    [correctAnswers] NVARCHAR(1000) NOT NULL,
    [grpId] INT NOT NULL,
    CONSTRAINT [Game_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Game_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[GRP] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [GRP_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Response] ADD CONSTRAINT [Response_grpId_fkey] FOREIGN KEY ([grpId]) REFERENCES [dbo].[GRP]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Game] ADD CONSTRAINT [Game_grpId_fkey] FOREIGN KEY ([grpId]) REFERENCES [dbo].[GRP]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
