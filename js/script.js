document
  .getElementById("registration-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const params = new URLSearchParams();
    for (const [k, v] of fd.entries()) params.append(k, v);

    const statusEl =
      document.getElementById("status") ||
      (() => {
        const s = document.createElement("p");
        s.id = "status";
        s.style.marginTop = "10px";
        s.style.color = "#00ff88";
        form.appendChild(s);
        return s;
      })();

    statusEl.textContent = "Đang gửi...";

    try {
      const res = await fetch("🔗DÁN_LINK_EXEC_Ở_ĐÂY", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        statusEl.textContent = "✅ Gửi thành công! BTC đã nhận thông tin.";
        form.reset();
      } else {
        statusEl.textContent = "❌ Gửi thất bại, thử lại sau.";
        console.error("Response lỗi:", json);
      }
    } catch (err) {
      console.error("Fetch lỗi:", err);
      statusEl.textContent =
        "⚠️ Lỗi mạng (có thể do URL / quyền truy cập Apps Script).";
    }
  });
