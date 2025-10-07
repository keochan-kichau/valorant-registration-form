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
    fetch("https://example.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) alert("Đăng ký thành công!");
        else alert("Có lỗi, thử lại sau.");
      })
      .catch((err) => {
        console.error(err);
        alert("Lỗi mạng");
      });
  });
