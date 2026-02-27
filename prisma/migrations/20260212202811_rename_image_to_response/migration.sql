BEGIN TRY
  BEGIN TRAN;

  -- 1) Eliminar FK viejo (apunta a Image)
  ALTER TABLE [dbo].[Gauge] DROP CONSTRAINT [Gauge_imageId_fkey];

  -- 2) Renombrar tabla: Image -> Response
  EXEC sp_rename 'dbo.Image', 'Response';

  -- 3) Renombrar columna: Gauge.imageId -> Gauge.responseId
  EXEC sp_rename 'dbo.Gauge.imageId', 'responseId', 'COLUMN';

  -- 4) Crear FK nuevo (ahora apunta a Response)
  ALTER TABLE [dbo].[Gauge]
  ADD CONSTRAINT [Gauge_responseId_fkey]
  FOREIGN KEY ([responseId]) REFERENCES [dbo].[Response]([id])
  ON DELETE SET NULL ON UPDATE CASCADE;

  COMMIT TRAN;
END TRY
BEGIN CATCH
  IF @@TRANCOUNT > 0 ROLLBACK TRAN;
  THROW;
END CATCH