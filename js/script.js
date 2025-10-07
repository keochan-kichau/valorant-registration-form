document.getElementById("registration-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const fd = new FormData(form);

  // Biến FormData -> URL-encoded (tránh preflight)
  const params = new URLSearchParams();
  for (const [k, v] of fd.entries()) params.append(k, v);

  // (tuỳ chọn) chỗ hiện trạng thái gửi
  let statusEl = document.getElementById('status');
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.id = 'status';
    statusEl.style.marginTop = '10px';
    statusEl.style.fontSize = '14px';
    statusEl.style.opacity = '.9';
    form.appendChild(statusEl);
  }
  statusEl.textContent = 'Đang gửi...';

  try {
    const res = await fetch("PASTE_YOUR_WEB_APP_URL_HERE", { // 👈 dán URL /exec
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });

    // Đọc JSON trả về từ Apps Script
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok) {
      statusEl.textContent = '✅ Đăng ký thành công! BTC đã nhận vào Google Sheets.';
      form.reset();
    } else {
      statusEl.textContent = '❌ Gửi thất bại. Thử lại sau.';
      console.error('Apps Script response:', json);
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = '⚠️ Lỗi mạng. Kiểm tra lại kết nối hoặc URL /exec.';
  }
});
