document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-form-update]").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const idField = this.querySelector("[data-id]");
      if (!idField || !idField.value.trim()) {
        alert("L'ID est manquant !");
        return;
      }

      const entityId = idField.value.trim();
      const entity = this.getAttribute("data-entity");
      const method = this.getAttribute("data-method") || "POST";

      if (method.toUpperCase() === "GET") {
        // 🔹 Si la méthode est GET, on redirige simplement
        window.location.href = `/${entity}/${entityId}/details`;
      } else {
        let methodInput = this.querySelector("input[name='_method']");
        if (!methodInput) {
          methodInput = document.createElement("input");
          methodInput.type = "hidden";
          methodInput.name = "_method";
          this.appendChild(methodInput);
        }
        methodInput.value = method;

        this.action = `/${entity}/${entityId}`;
        this.method = "POST";
        this.submit();
      }
    });
  });
});

document
  .getElementById("catwayDetailForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let catwayId = document.getElementById("catwayId").value.trim();
    if (catwayId) {
      window.location.href = `/catways/${catwayId}?view=details`;
    }
  });
