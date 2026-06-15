const input = document.querySelector('#searchInput');
const box = document.querySelector('#searchResults');
let posts = [];

function render(list) {
  if (!list.length) {
    box.innerHTML = '<div class="empty">没有找到匹配文章。</div>';
    return;
  }
  box.innerHTML = list.map(post => `
    <a class="archive-item" href="${post.url}">
      <time>${post.date}</time>
      <div>
        <h2>${post.title}</h2>
        <p>${post.description}</p>
      </div>
    </a>
  `).join('');
}

fetch('/search.json')
  .then(res => res.json())
  .then(data => {
    posts = data;
    render(posts);
  });

input?.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  if (!q) return render(posts);
  render(posts.filter(post => {
    const text = [post.title, post.description, ...(post.tags || [])].join(' ').toLowerCase();
    return text.includes(q);
  }));
});
