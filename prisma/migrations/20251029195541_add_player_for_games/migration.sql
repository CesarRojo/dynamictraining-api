BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Player] (
    [id] INT NOT NULL IDENTITY(1,1),
    [clock] NVARCHAR(1000) NOT NULL,
    [plant] NVARCHAR(1000) NOT NULL,
    [game] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Player_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Player_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CompletedSection] (
    [id] INT NOT NULL IDENTITY(1,1),
    [sectionId] INT NOT NULL,
    [playerId] INT NOT NULL,
    [completedAt] DATETIME2 NOT NULL CONSTRAINT [CompletedSection_completedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [CompletedSection_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CompletedSection] ADD CONSTRAINT [CompletedSection_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[Section]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CompletedSection] ADD CONSTRAINT [CompletedSection_playerId_fkey] FOREIGN KEY ([playerId]) REFERENCES [dbo].[Player]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
