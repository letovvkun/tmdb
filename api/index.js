export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  // Логика переключения между API и Картинками
  if (url.pathname.startsWith('/t/p/')) {
    url.hostname = 'image.tmdb.org';
  } else {
    url.hostname = 'api.themoviedb.org';
  }

  // Создаем новый запрос с подмененным хостом
  const newRequest = new Request(url, request);
  return fetch(newRequest);
}