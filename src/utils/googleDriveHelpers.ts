import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Configuración del cliente OAuth2
export const getOAuth2Client = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || '';

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
};

// Función para generar la URL de autenticación
export const getAuthUrl = () => {
  const oauth2Client = getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};

// Función para obtener tokens de acceso
export const getTokens = async (code: string) => {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

// Función para autenticar Google Drive
export const authenticateGoogleDrive = async () => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return authUrl;
};

// Función para subir un archivo a Google Drive
export const uploadFileToDrive = async (auth: any, fileName: string, fileContent: Buffer) => {
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
  };

  const media = {
    mimeType: 'application/pdf',
    body: fileContent,
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
};

// Función para eliminar un archivo de Google Drive
export const deleteFileFromDrive = async (auth: any, fileId: string) => {
  const drive = google.drive({ version: 'v3', auth });
  await drive.files.delete({ fileId });
};
