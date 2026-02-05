export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  // 1. Сначала убираем /api из начала пути, если оно там есть
  if (url.pathname.startsWith('/api')) {
    url.pathname = url.pathname.replace(/^\/api/, '');
  }

  // 2. Если путь начинается с /t/p/ — это картинка, идем на image.tmdb.org
  if (url.pathname.startsWith('/t/p/')) {
    url.hostname = 'image.tmdb.org';
  } else {
    // Иначе это запрос к API
    url.hostname = 'api.themoviedb.org';
  }

  // Создаем новый запрос с правильным адресом
  return fetch(new Request(url, request));
}
