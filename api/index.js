export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  // 1. Очистка пути: убираем /api, если оно есть в начале
  if (url.pathname.startsWith('/api')) {
    url.pathname = url.pathname.replace(/^\/api/, '');
  }

  // 2. Логика маршрутизации (Картинки vs API)
  if (url.pathname.startsWith('/t/p/')) {
    url.hostname = 'image.tmdb.org';
  } else {
    url.hostname = 'api.themoviedb.org';
  }

  // 3. Формируем чистый запрос без лишних заголовков Vercel
  const newRequest = new Request(url.toString(), {
    method: request.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // 4. Выполняем запрос
  const response = await fetch(newRequest);

  return response;
}
