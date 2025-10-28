BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Insulator] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Insulator_status_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Insulator_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Insulator_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Insulator_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Gauge] (
    [id] INT NOT NULL IDENTITY(1,1),
    [gauge] NVARCHAR(1000) NOT NULL,
    [rings] NVARCHAR(1000) NOT NULL,
    [features] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL CONSTRAINT [Gauge_status_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Gauge_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [insulatorId] INT NOT NULL,
    [sectionId] INT NOT NULL,
    CONSTRAINT [Gauge_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Gauge_insulatorId_sectionId_gauge_rings_features_key] UNIQUE NONCLUSTERED ([insulatorId],[sectionId],[gauge],[rings],[features])
);

-- AddForeignKey
ALTER TABLE [dbo].[Gauge] ADD CONSTRAINT [Gauge_insulatorId_fkey] FOREIGN KEY ([insulatorId]) REFERENCES [dbo].[Insulator]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Gauge] ADD CONSTRAINT [Gauge_sectionId_fkey] FOREIGN KEY ([sectionId]) REFERENCES [dbo].[Section]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
