document.addEventListener("DOMContentLoaded", () => {
  // ====== Inject Navbar ======
  const navHTML = `
    <nav id="main-nav" class="flex justify-center bg-[#f7f7f2] border-b border-[#ccc] p-2 flex-wrap sticky top-0 z-10">
      <a href="/index.html" class="nav-link" data-page="home">Home</a>
      <a href="/gallery.html" class="nav-link" data-page="gallery">Train Gallery</a>
      <a href="/about.html" class="nav-link" data-page="about">About</a>
    </nav>
  `;
  
  const header = document.querySelector("header");
  if (header) header.insertAdjacentHTML("afterend", navHTML);

  // ====== Inject Footer ======
  const currentYear = new Date().getFullYear();
  const footerHTML = `
    <footer class="text-center p-4 bg-[#f5f5f0] text-[#555] border-t border-[#ccc] text-sm mt-auto">
      <p>© 2025${currentYear > 2025 ? "–" + currentYear : ""} Aaron’s World — Built with ❤️ on 
      <a href="https://neocities.org" target="_blank" class="text-[#555] underline">Neocities</a></p>
    </footer>
  `;
  document.body.insertAdjacentHTML("beforeend", footerHTML);

  // ====== Highlight Active Link ======
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("font-semibold", "text-blue-600", "bg-blue-100", "rounded-lg", "px-4", "py-2");
    } else {
      link.classList.add("font-medium", "text-gray-600", "hover:text-gray-900", "hover:bg-gray-200", "rounded-lg", "px-4", "py-2");
    }
  });
});
