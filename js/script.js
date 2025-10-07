document
  .getElementById("registration-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    // ví dụ: gửi tới endpoint API bạn viết hoặc service form:
    fetch(
      "https://script.google.com/macros/s/AKfycbztdjAjqMe_Qeit4mA_nvGNJdzpQJ-rIaiZdwdc-enDI3wo0-I8uNOANTtwyQJ-G5wCCA/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    )
      .then((res) => {
        if (res.ok) alert("Đăng ký thành công!");
        else alert("Có lỗi, thử lại sau.");
      })
      .catch((err) => {
        console.error(err);
        alert("Lỗi mạng");
      });
  });
const status = document.createElement("p");
status.id = "status";
status.style.color = "#00ff88";
status.style.fontWeight = "bold";
form.appendChild(status);

// ... trong phần fetch ...
status.textContent = "Đang gửi...";

// Sau khi nhận kết quả:
if (json.ok) {
  status.textContent = "✅ Đăng ký thành công! BTC đã nhận thông tin.";
  form.reset();
} else {
  status.textContent = "❌ Có lỗi, vui lòng thử lại sau.";
}
