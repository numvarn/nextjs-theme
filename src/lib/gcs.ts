import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GCS_BUCKET_NAME || '';
const bucket = storage.bucket(bucketName);

/**
 * Upload a file to Google Cloud Storage
 * @param file - File buffer
 * @param fileName - Name of the file to save
 * @param folder - Optional folder path (e.g., 'products')
 * @returns Public URL of the uploaded file
 */
export async function uploadToGCS(
  file: Buffer,
  fileName: string,
  folder: string = 'products'
): Promise<string> {
  const blob = bucket.file(`${folder}/${Date.now()}_${fileName}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: 'image/jpeg', // You can make this dynamic based on file type
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', async () => {
      // Make the file public
      await blob.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file);
  });
}

/**
 * Delete a file from Google Cloud Storage
 * @param fileUrl - Public URL of the file to delete
 */
export async function deleteFromGCS(fileUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const fileName = fileUrl.split(`${bucketName}/`)[1];
    if (!fileName) {
      throw new Error('Invalid file URL');
    }

    await bucket.file(fileName).delete();
  } catch (error) {
    console.error('Error deleting file from GCS:', error);
    throw error;
  }
}

/**
 * Delete multiple files from Google Cloud Storage
 * @param fileUrls - Array of public URLs to delete
 */
export async function deleteMultipleFromGCS(fileUrls: string[]): Promise<void> {
  const deletePromises = fileUrls.map((url) => deleteFromGCS(url));
  await Promise.all(deletePromises);
}

export { storage, bucket };
