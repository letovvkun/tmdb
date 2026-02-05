export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);

  // 1. Убираем префикс /api, если он есть
  if (url.pathname.startsWith('/api')) {
    url.pathname = url.pathname.replace(/^\/api/, '');
  }

  // 2. Определяем, куда идем (картинки или API)
  if (url.pathname.startsWith('/t/p/')) {
    url.hostname = 'image.tmdb.org';
  } else {
    url.hostname = 'api.themoviedb.org';
  }

  // 3. ВАЖНО: Создаем абсолютно новый запрос
  // Мы НЕ копируем старый request целиком, чтобы не передать заголовок Host
  const newRequest = new Request(url.toString(), {
    method: request.method,
    headers: {
      // Передаем только самое важное. TMDB не любит лишние хедеры.
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // 4. Отправляем запрос
  const response = await fetch(newRequest);

  // 5. Добавляем заголовки, чтобы браузер не ругался на CORS
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return newResponse;
}
