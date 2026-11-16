const uploadServerUrl = (import.meta.env.VITE_UPLOAD_SERVER_URL || 'http://localhost:5000').replace(/\/+$/, '');

export function getBookCoverUrl(coverUrl) {
  if (!coverUrl) return '';
  if (/^https?:\/\//i.test(coverUrl)) return coverUrl;
  return `${uploadServerUrl}/${coverUrl.replace(/^\/+/, '')}`;
}

export async function uploadBookCover(file, uid) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${uploadServerUrl}/upload?uid=${encodeURIComponent(uid)}`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Unable to upload the book cover.');
  }
  if (!result.fileUrl) {
    throw new Error('The server did not return a book cover URL.');
  }

  return result.fileUrl;
}
